const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const querystring = require('query-string');
const Hotel = require("../models/hotelModel");
const Orders = require("../models/orderModel");
const { loginMessage } = require("../emails/account");

exports.fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: 'Error in fetching all users' });
    }
}

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validaton
    try {
        if (!name) {
            return res.status(400).json({ status: 'Failure', message: 'Name is required' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ status: 'Failure', message: 'Password must have minimum 6 characters' });
        }

        let userExist = await User.findOne({ email });
        if (userExist) {
            console.log(userExist);
            return res.status(400).json({ status: 'Failure', message: 'User with this email already exists' });
        }

        const response = await loginMessage(name, email);
        if(!response){
            res.status(400).send({status: 'Failure', message: 'Email services failed. Try after sometime'})
        }

        const user = new User(req.body);    
        await user.save();

        res.send({ status: "success", message: "User successfully created"})
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'Failure', message: 'User with this email does not exist' });
        }
        user.comparePassword(password, (match) => {
            if (!match) {
                return res.status(400).json({ status: 'Failure', message: 'Enter correct password' });
            }
            // console.log('generating token');
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            res.status(200).json({ token, user });
        })
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.createStripeAccount = async (req, res) => {
    const userID = req.user._id;
    const user = await User.findById(userID).exec();
    try {

        // setting account stripe id
        if (!user.stripeAccountID) {
            const account = await stripe.accounts.create({
                type: "standard"
            })
            console.log(account);
            user.stripeAccountID = account.id;
            user.save();
        }

        // setup account link
        let accountLink = await stripe.accountLinks.create({
            account: user.stripeAccountID,
            refresh_url: process.env.REDIRECT_URL,
            return_url: process.env.REDIRECT_URL,
            type: 'account_onboarding'
        })

        // adding required data
        accountLink = Object.assign(accountLink, {
            stripeUserEmail: user.email
        })

        res.send({ status: 'Success', setupLink: `${accountLink.url}?${querystring.stringify(accountLink)}` });

    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.getStripeAccountStatus = async (req, res) => {
    // get account status
    const userID = req.user._id;
    const user = await User.findById(userID).exec();

    const stripeID = user.stripeAccountID;
    try {
        const accountStatus = await stripe.accounts.retrieve(stripeID);

        // console.log(accountStatus);

        const updateUser = await User.findByIdAndUpdate(userID, {
            stripeSeller: accountStatus
        }, { new: true }).exec();

        console.log(updateUser);

        res.send({ status: 'Success', updateUser });
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.getPendingBalance = async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await User.findById(userID).exec();

        const balance = await stripe.balance.retrieve({ stripeAccount: user.stripeAccountID });
        res.json({ status: 'success', balance });
    } catch (error) {
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.getSessionId = async (req, res) => {
    const hotelId = req.body.hotelId;
    try {
        // get hotel from hotel id
        const hotel = await Hotel.findById(hotelId).populate('postedBy').exec();
        // make application fee
        const fee = (hotel.price * 20) / 100;
        console.log(fee);
        // create session for payment
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.SUCCESS_URL}/${hotel._id}`,
            cancel_url: process.env.CANCEL_URL,
            payment_method_types: ['card'],
            // what to show during payment
            line_items: [
                { amount: hotel.price * 100, name: hotel.title, currency: 'inr', quantity: 1 },
            ],
            // other payment details
            payment_intent_data: {
                application_fee_amount: fee * 100,
                transfer_data: {
                    destination: hotel.postedBy.stripeAccountID,
                }
            },
        })
        // save this session to user
        await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();

        res.send({ sessionId: session.id });
    } catch (error) {
        console.log("ERROR=>", error);
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}

exports.stripeSuccess = async (req, res) => {
    try {
        // get user
        let user = await User.findById(req.user._id);
        // get stripe session
        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
        // now the payment has to be updated
        if (session.payment_status === 'paid') {
            // since sometime users get their page refresh at that time to get the page failed check for the same order id
            const order = await Orders.findOne({ 'session.id': session.id }).exec();
            if (order) {
                return res.json({ success: "true" })
            }

            let newOrder = new Orders({
                hotel: req.body.hotelId,
                session,
                orderBy: user._id
            })
            await newOrder.save();
            console.log(newOrder);
            // after success we have to delete that session 
            await User.findByIdAndUpdate(user._id, {
                $set: {
                    stripeSession: {}
                }
            })
            res.json({ success: true })
        }

    } catch (error) {
        console.log("ERROR=>", error);
        res.status(404).json({ status: 'Failure', message: error.message });
    }
}