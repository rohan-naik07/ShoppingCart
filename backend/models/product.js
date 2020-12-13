const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const ProductSchema = new Schema({
    ownerId : String,
    title: String,
    imageUrl: String,
    description: String,
    price: Currency
},{
    timestamps: true
});

module.exports = mongoose.model('Product',ProductSchema);