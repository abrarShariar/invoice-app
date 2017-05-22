//schema for customer
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let customerSchema = new Schema({
    username: {type: String, unique: true, dropDups: true},
    nid: {type: Number, unique: true, dropDups: true},
    email: String,
    fullname: String,
    customer_currency: String,
    mobile_primary: {type: String, unique: true, dropDups: true},
    mobile_secondary: String,
    website: String,
    country: String,
    location: String,
    area: String,
    city: String,
    postal_code: String,
    status: Boolean,
    isGenerateInvoiceMonthly: {type: Boolean, default: false},
    productList: [String],
    created_on: {type: Date, default: Date.now}
});
