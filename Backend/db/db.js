const mongoose = require('mongoose');

function connectToDb() {
    // mongoose.connect(process.env.DB_CONNECT, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }).then.catch(err => {
    //     console.error('Error connecting to MongoDB', err);
    // });

    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
}

module.exports = connectToDb;