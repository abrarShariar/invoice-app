//schema for product
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let productSchema = new Schema({
    id: String,
    name: String,
    rate: String,
    description: String
});
