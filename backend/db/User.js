const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:String,
    token:String
})

module.exports = mongoose.model("users",userSchema);