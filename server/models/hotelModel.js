const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        min: 10,
        max: 1000
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    image: {
        data: Buffer,
        contentType: String
    },
    from: {
        type: Date,
        required: [true, 'From date is required'],
    },
    to: {
        type: Date,
        required: [true, 'To date is required'],
    },
    bed: {
        type: Number,
        required: [true, 'Bed is required'],
    }
}, {
    timestamps: true
}
)

const Hotel = mongoose.model('hotels', hotelSchema);
module.exports = Hotel;