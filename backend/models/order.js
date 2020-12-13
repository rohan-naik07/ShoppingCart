const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const OrdersSchema = new Schema({
    userId : String,
    orders : [{
        cartItems : [{
            imageUrl: String,
            price: Currency,
            quantity: Number,
            title: String
        }],
        date: Date,
        totalAmount : Currency
    }]
});
//UnhandledPromiseRejectionWarning: 
//CastError: Cast to ObjectId failed for value "wWcbiXoaLSVrs7n3A19z1ffWwaL2" at path "_id" for model "Orders"

/**
 * Backend ref
Object {
  "-MNyJrD-IQIcWOFhjaJX": Object {
    "cartItems": Array [
      Object {
        "id": "-MNrQqAzOnA6W9buRsm-",
        "imageUrl": "https://static.digit.in/default/db80c6f12355307b593c0af60ad5403adbd2ab06.jpeg?tr=1200",
        "price": 65000,
        "quantity": 1,
        "title": "Samsung's m31 ",
      },
    ],
    "date": "2020-12-07T17:50:24.144Z",
    "totalAmount": 65000,
  },
  "-MOFjndC1sibeCwTJKFW": Object {
    "cartItems": Array [
      Object {
        "id": "-MOFhVA9BPIkRTiDUULf",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/71E5zB1qbIL._SL1500_.jpg",
        "price": 95000,
        "quantity": 1,
        "title": "iPhone 12",
      },
    ],
    "date": "2020-12-11T07:41:17.116Z",
    "totalAmount": 95000,
  },
}

 */

module.exports = mongoose.model('Orders',OrdersSchema);
