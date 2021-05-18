const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');
// mongoose.connect('mongodb+srv://userone:userone@ictakfiles.zmywv.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    name : String,
    description : String,
    genre : Array,
    about : String,
    image : String
});

var AuthorData = mongoose.model('authordata' , AuthorSchema);

module.exports = AuthorData;