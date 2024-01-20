const mongoose = require("mongoose");
require('dotenv').config()
const mongodbURL = process.env.mongo_db;
const connectDB = () => {
    return mongoose.connect(mongodbURL);
}
module.exports = { connectDB };