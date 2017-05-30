var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/invoiceDB');

//schema for customer
var customerSchema = mongoose.Schema({
    username: {type: String, unique: true, dropDups: true},
    nid: {type: Number, unique: true, dropDups: true},
    email: String,
    fullname: String,
    customer_currency: String,
    mobile_primary: {type: String, unique: true, dropDups: true},
    mobile_secondary: String,
    website: String,
    country: String,
    location: String,
    area: String,
    city: String,
    postal_code: String,
    status: Boolean,
    isGenerateInvoiceMonthly: {type: Boolean, default: false},
    productList: [String],
    created_on: {type: Date, default: Date.now}
});

var Customer = mongoose.model('customer', customerSchema);

var db = mongoose.connection;
db.on('error', function () {
    console.log('error in connection');
});

db.once('open', function () {
    var data_array = [
        new Customer({
            username: 'User 101',
            nid: 100000001,
            email: 'user101@gmail.com',
            fullname: 'User Full 101',
            customer_currency: 'BDT',
            mobile_primary: '+880000000001',
            mobile_secondary: '+88012123132',
            website: 'www.user101.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 102',
            nid: 100000002,
            email: 'user102@gmail.com',
            fullname: 'User Full 102',
            customer_currency: 'BDT',
            mobile_primary: '+880000000002',
            mobile_secondary: '+880121231322',
            website: 'www.user102.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 103',
            nid: 100000003,
            email: 'user101@gmail.com',
            fullname: 'User Full 103',
            customer_currency: 'BDT',
            mobile_primary: '+880000000003',
            mobile_secondary: '+88012123133',
            website: 'www.user103.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 104',
            nid: 100000004,
            email: 'user101@gmail.com',
            fullname: 'User Full 104',
            customer_currency: 'BDT',
            mobile_primary: '+880000000004',
            mobile_secondary: '+88012123134',
            website: 'www.user104.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 105',
            nid: 1000000005,
            email: 'user101@gmail.com',
            fullname: 'User Full 105',
            customer_currency: 'BDT',
            mobile_primary: '+880000000005',
            mobile_secondary: '+88012123135',
            website: 'www.user105.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 106',
            nid: 1000000006,
            email: 'user101@gmail.com',
            fullname: 'User Full 106',
            customer_currency: 'BDT',
            mobile_primary: '+880000000006',
            mobile_secondary: '+88012123136',
            website: 'www.user106.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 107',
            nid: 1000000007,
            email: 'user107@gmail.com',
            fullname: 'User Full 107',
            customer_currency: 'BDT',
            mobile_primary: '+880000000007',
            mobile_secondary: '+88012123137',
            website: 'www.user107.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 108',
            nid: 100000008,
            email: 'user108@gmail.com',
            fullname: 'User Full 108',
            customer_currency: 'BDT',
            mobile_primary: '+880000000001',
            mobile_secondary: '+88012123132',
            website: 'www.user108.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 109',
            nid: 1000000009,
            email: 'user101@gmail.com',
            fullname: 'User Full 109',
            customer_currency: 'BDT',
            mobile_primary: '+880000000009',
            mobile_secondary: '+88012123139',
            website: 'www.user101.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 110',
            nid: 100000000110,
            email: 'user101@gmail.com',
            fullname: 'User Full 110',
            customer_currency: 'BDT',
            mobile_primary: '+880000000001',
            mobile_secondary: '+88012123132',
            website: 'www.user101.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 112',
            nid: 1000000012,
            email: 'user101@gmail.com',
            fullname: 'User Full 112',
            customer_currency: 'BDT',
            mobile_primary: '+88000000000112',
            mobile_secondary: '+8801212313212',
            website: 'www.user112.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 120',
            nid: 10000000120,
            email: 'user101@gmail.com',
            fullname: 'User Full 120',
            customer_currency: 'BDT',
            mobile_primary: '+880000000001',
            mobile_secondary: '+88012123132',
            website: 'www.user101.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 130',
            nid: 100000000130,
            email: 'user101@gmail.com',
            fullname: 'User Full 130',
            customer_currency: 'BDT',
            mobile_primary: '+88000000000130',
            mobile_secondary: '+88012123132',
            website: 'www.user130.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        }),
        new Customer({
            username: 'User 140',
            nid: 10000000140,
            email: 'user101@gmail.com',
            fullname: 'User Full 140',
            customer_currency: 'BDT',
            mobile_primary: '+880000000001',
            mobile_secondary: '+88012123132',
            website: 'www.user140.com',
            country: 'Bangladesh',
            location: 'DOHS',
            area: '5929a9102c7ad20cc9fe1ba4',
            city: 'Tangail',
            postal_code: '1900',
            status: true,
            productList: [
                '5929ad79d4fbd11305047194',
                '5929ad79d4fbd11305047197'
            ]
        })
    ];

    data_array.map(function (customer) {
        customer.save(function (err) {
            if (err) {
                console.log('Error in inserting to DB');
            } else {
                console.log('Successfully entered into DB');
            }
        })
    })
});