const mongoose = require("mongoose");
const config = require("./config");

const  dbConnect = async () => {
    try {
        await mongoose.connect(config.mongo_uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

module.exports = dbConnect;