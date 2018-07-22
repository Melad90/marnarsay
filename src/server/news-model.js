const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    Title: String,
    Innehall: String
},{
    collation: 'Nyheter'
});

const nyhet = mongoose.model('Nyhet', NewsSchema);
module.exports = nyhet;