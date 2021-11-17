const express = require('express');
const { createHotel, fetchAllHotels, fetchHotelImage, fetchSellerHotels, deleteHotel, fetchHotelData, updateHotelData, fetchUserHotels, fetchBookStatus, searchHotels } = require('../controllers/hotelController');
const formidable = require('express-formidable');
const { auth } = require('../middleware');
const router = express.Router();

router.post('/create-hotel', auth, formidable(), createHotel);
router.get('/get-hotels', fetchAllHotels);
router.get('/image/:id', fetchHotelImage);
router.get('/seller-hotels', auth, fetchSellerHotels);
router.delete('/delete-hotel/:id', auth, deleteHotel);
router.get('/hotel-details/:id', fetchHotelData);
router.put('/hotel-details/:id', auth, formidable(), updateHotelData);
router.get('/user-hotels', auth, fetchUserHotels);
router.get('/booking-status/:id', auth, fetchBookStatus);
router.post('/search-hotel', searchHotels)

module.exports = router;