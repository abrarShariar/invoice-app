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

        /*
            Need to fix bug here
        */
        // this.personModel = model('person', this.personSchema);     
        let person = model('person', this.personSchema);
        person.find({}, (err, data) => {
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

    /*
       Need to fix bug here
    */
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