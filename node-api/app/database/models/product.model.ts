/*
* model for Customer
*/
import * as mongoose from 'mongoose';
import { productSchema } from '../schema/product.schema';

export const ProductModel = mongoose.model('product',productSchema); 
