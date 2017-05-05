/*
* model for Customer
*/
import * as mongoose from 'mongoose';
import { customerSchema } from '../schema/customer.schema';

export const CustomerModel = mongoose.model('customer',customerSchema); 
