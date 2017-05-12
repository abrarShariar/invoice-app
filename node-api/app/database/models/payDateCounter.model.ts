/*
 * model for Area
 */
import * as mongoose from 'mongoose';
import {payDateCounterSchema} from '../schema/payDateCounter.schema';

export const PayDateCounterModel = mongoose.model('payDateCounter', payDateCounterSchema);
