import { Router, Request, Response } from 'express';
import { PersonModel } from '../database/models/person.model';
import { Person } from '../classes/Person';
/*
* Controller to handle request to /home 
*/
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