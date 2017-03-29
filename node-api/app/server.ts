import * as express from 'express';
import { ApiRoute } from './routing/api.routes';
import { DBConfig } from './database/db.config';
import { connect } from 'mongoose';

const app: express.Application = express();
const port: number = process.env.PORT || 5000;

// api router endpoint
app.use('/api',ApiRoute);

app.listen(port,()=>{
    DBConfig.connectMongoDB();
    console.log(`Listening at port :${port}`);
});