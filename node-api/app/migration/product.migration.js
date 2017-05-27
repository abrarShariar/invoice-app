var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/invoiceDB');
//schema for area
var productSchema = mongoose.Schema({
    id: String,
    name: {type: String, unique: true, dropDups: true},
    rate: Number,
    description: String,
    status: Boolean,
    vat: String
});
var Product = mongoose.model('product', productSchema);

var db = mongoose.connection;
db.on('error', function () {
    console.log('error in connection');
});

db.once('open', function () {
    var data_array = [
        new Product({name: '256 Kbps', rate: 500, description: '', status: true, vat: '10'}),
        new Product({name: '512 Kbps', rate: 600, description: '', status: true, vat: '10'}),
        new Product({name: '1 Mbps', rate: 1000, description: '', status: true, vat: '10'}),
        new Product({name: '2 Mbps', rate: 2000, description: '', status: true, vat: '10'}),
        new Product({name: '3 Mbps', rate: 3000, description: '', status: true, vat: '10'}),
        new Product({name: '4 Mbps', rate: 4000, description: '', status: true, vat: '10'}),
        new Product({name: '5 Mbps', rate: 5000, description: '', status: true, vat: '10'})
    ];

    data_array.map(function (product) {
        product.save(function (err) {
            if (err) {
                console.log('error in inserting Area data into DB');
            } else {
                console.log('Product data inserted successfully');
            }
        })
    });
});