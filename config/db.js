const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connect = await mongoose.connect('mongodb://localhost/shop-ecommerce');
        console.log(`MongoDb connected: ${connect}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;