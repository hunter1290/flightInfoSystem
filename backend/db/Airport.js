const mongoose = require('mongoose')

const airportSchema = new mongoose.Schema({
    name:String,
    airport_id:String,
    user_id:String,
    flight_id:String,
})

module.exports = mongoose.model("airport",airportSchema);