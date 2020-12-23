const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const ReviewsSchema = new Schema({
    userId : String,
    productId : String,
    date: Date,
    rating : Number,
    feedback : String
});

module.exports = mongoose.model('Reviews',ReviewsSchema);
