const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost/invoiceDB');


mongoose.connection.on('open', function () {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
        } else {
            names.map(function (item) {
                mongoose.connection.collection(item.name).drop(function (err) {
                    console.log('Cleaned ' + item.name + ' successfully');
                })
            })
        }
        mongoose.connection.close();
    });
});