const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

// Middleware - order matters!
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectToDb();

// Routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;