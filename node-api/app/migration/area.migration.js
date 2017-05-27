var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/invoiceDB');

//schema for area
var areaSchema = mongoose.Schema({
    id: String,
    name: {type: String, unique: true, dropDups: true},
    status: Boolean
});
var Area = mongoose.model('area', areaSchema);

var db = mongoose.connection;
db.on('error', function () {
    console.log('error in connection');
});

db.once('open', function () {
    var data_array = [
        new Area({name: 'Area 101', status: true}),
        new Area({name: 'Area 102', status: true}),
        new Area({name: 'Area 103', status: true}),
        new Area({name: 'Area 104', status: true}),
        new Area({name: 'Area 105', status: true}),
        new Area({name: 'Area 106', status: true}),
        new Area({name: 'Area 107', status: true}),
        new Area({name: 'Area 108', status: true}),
        new Area({name: 'Area 109', status: true}),
        new Area({name: 'Area 110', status: true}),
        new Area({name: 'Area 111', status: true}),
        new Area({name: 'Area 112', status: true}),
        new Area({name: 'Area 113', status: true}),
        new Area({name: 'Area 114', status: true}),
        new Area({name: 'Area 115', status: true})
    ];

    data_array.map(function (area) {
        area.save(function (err) {
            if (err) {
                console.log('error in inserting Area data into DB');
            } else {
                console.log('Area data inserted successfully');
            }
        })
    });
});