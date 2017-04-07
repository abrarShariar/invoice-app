//schema for customer
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let areaSchema = new Schema({
    id: String,
    name : {type:String, unique: true,dropDups: true },
    status: Boolean
});
