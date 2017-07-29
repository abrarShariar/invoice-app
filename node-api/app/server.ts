import * as express from 'express';
import {ApiRoute} from './routing/api.routes';
import {connectMongoDB} from './database/db.config';
import * as schedule from 'node-schedule';
import {DeamonController} from './controllers/deamon.controller';

const app: express.Application = express();
const port: number = process.env.PORT || 5000;

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// api router endpoint
app.use('/api', ApiRoute);

// handling a daemon job
let rule = {hour: 12, minute: 26, dayOfMonth: 23, month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]};
schedule.scheduleJob(rule, function () {
    DeamonController.autoGenerateInvoice();
});

app.listen(port, () => {
    connectMongoDB();
    console.log(`Listening at port :${port}`);
});