const Hotel = require("../models/hotelModel");
const fs = require('fs');
const Orders = require("../models/orderModel");

exports.createHotel = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
        // image handling
        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }
        await hotel.save();
        res.json({ status: 'Success', message: 'Hotel successfully posted' });
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.fetchAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({}).limit(24).select('-image.data').populate('postedBy', '_id name').exec();
        res.json({ status: 'Success', hotels });
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.fetchHotelImage = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).exec();
        if (hotel.image && hotel.image.data !== null) {
            res.set('Content-type', hotel.image.contentType);
            return res.send(hotel.image.data);
        }
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.fetchSellerHotels = async (req, res) => {
    try {
        let hotels = await Hotel.find({ postedBy: req.user._id }).select("-image.data").populate('postedBy', '_id name').exec();
        res.send(hotels);
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).exec();
        const owner = hotel.postedBy == req.user._id;
        if (owner) {
            const removed = await Hotel.findByIdAndDelete(req.params.id).exec();
            res.json({ status: 'Success', removed });
        }
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.fetchHotelData = async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.id).select('-image.data').populate("postedBy", "_id name").exec();
        res.send(hotel);
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.updateHotelData = async (req, res) => {
    let fields = req.fields;
    let files = req.files;
    let hotelData = { ...fields };
    if (files.image) {
        let image = {};
        image.data = fs.readFileSync(files.image.path);
        image.contentType = files.image.type;
        hotelData.image = image
    }
    try {
        const hotel = await Hotel.findById(req.params.id);
        const owner = hotel.postedBy == req.user._id;
        if (owner) {
            let updatedData = await Hotel.findByIdAndUpdate(req.params.id, hotelData, { new: true }).select("-image.data").exec();
            res.send(updatedData);
        }
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.fetchUserHotels = async (req, res) => {
    try {
        const hotels = await Orders.find({ orderBy: req.user._id }).select('session').populate('hotel', '-image.data').populate('orderBy', '_id name').exec();
        res.send(hotels);
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.fetchBookStatus = async (req, res) => {
    try {
        const isBooked = await Orders.findOne({ orderBy: req.user._id, hotel: req.params.id }).exec();
        if (isBooked) {
            res.send({ booked: true });
        } else {
            res.send({ booked: false });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.searchHotels = async (req, res) => {
    const { location, bed, date } = req.body;
    const fromDate = date.split(",")[0];
    const toDate = date.split(",")[1];
    try {
        let result = await Hotel.find({ from: { $lte: new Date(fromDate) }, to: { $gte: new Date(toDate) }, location, bed: { $gte: bed } }).select("-image.data").exec();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}