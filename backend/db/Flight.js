const mongoose = require('mongoose')

//fligh_data ->flight_id _id,airport,airline,status,departure_gate,actual_deprature_gate,arrival_gate,actual_arrival_gate,schedule_deprature,actual_arrival,scheduled_departure,actual_departure

const fligntSchema = new mongoose.Schema({
    flight_id:String,
    airport:String,
    status:String,
    from:String,
    to:String,
    departure_gate:String,
    actual_departure_gate:String,
    arrival_gate:String,
    actual_arrival_gate:String,
    schedule_departure:String,
    actual_schedule_departure:String,
    schedule_arrival:String,
    actual_schedule_arrival:String,
})

module.exports = mongoose.model("flights",fligntSchema);