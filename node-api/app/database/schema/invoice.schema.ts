//schema for invoice
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let invoiceSchema = new Schema({
    id: String,
    customer_id: String,
    payment_due_date: String,
    amount_due: String,
    status: String,
    total: String,
    discount: String,
    paid_date: String,
    amount_partially_paid: String,
    productList: [String],
    created_on: { type: Date, default: Date.now }
});
