const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: "hotels"
    },
    session: {},
    orderBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;
