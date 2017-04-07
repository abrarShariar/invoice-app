/*
* model for Area
*/
import * as mongoose from 'mongoose';
import { areaSchema } from '../schema/area.schema';

export const AreaModel = mongoose.model('area',areaSchema); 
