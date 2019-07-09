const mongoose = require('mongoose');
const shopeeOrderSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true
    }
},{ strict: false })
module.exports = mongoose.model('orders', shopeeOrderSchema);