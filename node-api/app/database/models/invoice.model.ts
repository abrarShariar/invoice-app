/*
* model for Invoice
*/
import * as mongoose from 'mongoose';
import {invoiceSchema } from '../schema/invoice.schema';

export const AllInvoiceModel = mongoose.model('all_invoice', invoiceSchema);
export const RecentInvoiceModel = mongoose.model('recent_invoice', invoiceSchema);