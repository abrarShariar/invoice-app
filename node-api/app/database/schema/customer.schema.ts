//schema for customer
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let customerSchema = new Schema({
    username: String,
    email: String,
    fullname: String,
    customer_currency: String,
    mobile_primary: String,
    mobile_secondary: String,
    website: String,
    country: String,
    location: String,
    area: String,
    city: String,
    postal_code: String
});
