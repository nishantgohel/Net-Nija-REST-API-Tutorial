const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],   // Here [Number] represents array of type number
        index: '2dsphere'
    }
});


// create Schema & model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry : GeoSchema
    
});






const Ninja = mongoose.model('ninja', NinjaSchema);   // here 'ninja' will be the name of collection in DB

module.exports = Ninja;