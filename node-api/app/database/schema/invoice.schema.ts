//schema for invoice
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export let invoiceSchema = new Schema({
    id: String,
    recent_id: String,
    customer_id: String,
    payment_due_date: String,
    amount_due: Number,
    status: String,
    total: Number,
    discount: Number,
    paid_date: String,
    amount_partially_paid: [{date: Date, amount: Number}],
    productList: [String],
    created_on: {type: Date, default: Date.now}
});
