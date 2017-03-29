import { connect } from 'mongoose';
/*
*   Database connection to mongoDB
*/
export class DBConfig{
    static connectMongoDB(){
        connect('mongodb://localhost/invoiceDB',(err)=>{
            if(err) console.log("Failed to connect to DB");
            console.log("Successfully connected to MongoDB");
        });
    }
}
