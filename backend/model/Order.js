const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    name: {
        type: String
    },
    product: {
        type: String
    },
    quantity: {
        type: Number
    },
    total_price: {
        type: Number
    },
    created_at: {
        type: Date
    }
}, {
    collection: 'order'
});

module.exports = mongoose.model('Order', Order);