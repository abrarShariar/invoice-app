import { connect } from 'mongoose';
/*
*   Database connection to mongoDB
*/
export const connectMongoDB = () => {
    connect('mongodb://localhost/invoiceDB', (err) => {
        if (err) {
            console.log("Failed to connect to DB");
        } else {
            console.log("Successfully connected to MongoDB");
        }
    });

}