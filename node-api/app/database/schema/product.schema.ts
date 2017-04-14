//schema for product
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let productSchema = new Schema({
    id: String,
    name: {type:String, unique: true,dropDups: true },
    rate: Number,
    description: String,
    status: Boolean,
    vat: String
});
