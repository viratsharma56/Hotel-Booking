const express = require('express');
const { registerUser, fetchAllUsers, loginUser, createStripeAccount, getStripeAccountStatus, getPendingBalance, getSessionId, stripeSuccess } = require('../controllers/userController');
const { auth } = require('../middleware');
const router = express.Router();

router.get('/', fetchAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);


router.post('/create-stripe-account', auth, createStripeAccount);
router.post('/get-account-status', auth, getStripeAccountStatus);
router.post('/get-account-balance', auth, getPendingBalance);
router.post('/get-session-id', auth, getSessionId);
router.post('/stripe-success', auth, stripeSuccess);

module.exports = router