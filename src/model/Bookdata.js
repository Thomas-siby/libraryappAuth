const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library');
// mongoose.connect('mongodb+srv://userone:userone@ictakfiles.zmywv.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title : String,
    author : String,
    genre : Array,
    summary : String,
    image : String
});

var BookData = mongoose.model('bookdata' , BookSchema);

module.exports = BookData;