const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoutes=require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes=require('./routes/captain.routes');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();
app.use('/captains', captainRoutes);
app.use('/users', userRoutes);

const cors=require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;