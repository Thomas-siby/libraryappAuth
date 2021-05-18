const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    firstname : String,
    lastname : String,
    phone : Number
});
module.exports = mongoose.model('User',userSchema);