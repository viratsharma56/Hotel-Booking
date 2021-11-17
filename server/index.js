const express = require('express');
const cors = require('cors');
const Connect = require('./db/db');
require("dotenv").config();

const userRouter = require('./routes/userRouter');
const hotelRouter = require('./routes/hotelRouter');

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/hotels', hotelRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
});

Connect();