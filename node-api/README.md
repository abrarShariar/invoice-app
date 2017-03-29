# node-typescript-starterkit
 
A starterkit for building Node.js / Express.js application using Typescript. Currently I use it for setting up and running a RESTful backend in Node.


```sh
    $ git clone https://github.com/abrarShariar/node-typescript-starterkit.git
    $ npm install
    $ npm start
```

## Directory structure

```
    ./app
        /classes
        /controllers
        /database
        /routing
        server.ts
```

## Controllers

Application controllers are placed in the ```controllers``` directory. Controlles are typescript classes with methods to handle http request and response from the router.

***Example:***

[home.controller.ts](https://github.com/abrarShariar/node-typescript-starterkit/blob/master/app/controllers/home.controller.ts)


```ts
import { Router, Request, Response } from 'express';
import { PersonModel } from '../database/models/person.model';
import { Person } from '../classes/Person';


export class HomeController{
    static personModel = new PersonModel();
    constructor(){}

    static getHome(req:Request,res:Response):Response{
       return res.send("Welcome To API Home !!");
    }

    static getAllPerson(req:Request,res:Response):Response{
        let data = HomeController.personModel.getAllPerson();
        return res.send(data);
    }
}

```


## Database

Database settings and models are placed in the ```database``` directory. It contains a [db.config.ts](https://github.com/abrarShariar/node-typescript-starterkit/blob/master/app/database/db.config.ts) file and a ```models``` sub-directory for Model classes. Here I used MongoDB with mongoose. Other databases can be used by making some changes to the config file and model classes:


[db.config.ts](https://github.com/abrarShariar/node-typescript-starterkit/blob/master/app/database/db.config.ts)

```ts
import { connect } from 'mongoose';
/*
*   Database connection to mongoDB
*/ 
export class DBConfig{
    static connectMongoDB(){
        connect('mongodb://localhost/testDB',(err)=>{
            if(err) console.log("Faied to connect to DB");
            console.log("Successfully connected to MongoDB");
        });
    }
}
```

Sample Model class:
[person.model.ts](https://github.com/abrarShariar/node-typescript-starterkit/blob/master/app/database/models/person.model.ts)

```ts
/*
* model and schema for Person
*/
import { Schema, Model, model } from 'mongoose';
import { Person } from '../../classes/Person';

export class PersonModel {
    private personSchema: Schema;
    private personModel: any;

    constructor() {
        this.personSchema = new Schema({
            id: Number,
            name: String,
            email: String,
            skills: [String]
        });

        this.personModel = model('person', this.personSchema);     
        this.personModel.find({}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }

    createPerson(person: Person) {
        return new this.personModel(person);
    }

    getAllPerson() {
        this.personModel.find({}, (err, data) => {
            if (err) {
                return "ERROR in fetching People data from DB";
            } else {
                return data;
            }
        });
    }
}

``` 

## Routing

The ```routing``` directory contains the ```api.routes.ts``` file where all the API endpoints for the application is written. 
All routes defined here starts with the `/api/`. For example: ```localhost:8080/api/home/```




[api.routes.ts](https://raw.githubusercontent.com/abrarShariar/node-typescript-starterkit/master/app/routing/api.routes.ts)

```ts
import { Router, Request, Response } from 'express';
import { HomeController } from '../controllers/home.controller';

const router: Router = Router();

/*
* API endpoints are defined here 
* all routes start with /api
*/
router.get('/', (req: Request, res: Response) => {
    res.send("Welcome to API routes");
});

router.get('/home', (req: Request, res: Response) => {
    HomeController.getHome(req, res);
});

router.get('/home/person/all',(req:Request, res:Response) => {
    HomeController.getAllPerson(req,res);
});



export const ApiRoute: Router = router;

```


## Root

[server.ts](https://github.com/abrarShariar/node-typescript-starterkit/blob/master/app/server.ts) is the entry point of the application.

```ts
import * as express from 'express';
import { ApiRoute } from './routing/api.routes';
import { DBConfig } from './database/db.config';
import { connect } from 'mongoose';

const app: express.Application = express();
const port: number = process.env.PORT || 8080;

app.use('/api',ApiRoute);

app.listen(port,()=>{
    DBConfig.connectMongoDB();
    console.log(`Listening at port :${port}`);
});
```