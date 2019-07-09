const mongoose = require('mongoose');
const orderUpdateSchema = mongoose.Schema({
    orderId: {
        type: String,
        require: true,
    }
})
module.exports = mongoose.model('updateOrder', orderUpdateSchema);