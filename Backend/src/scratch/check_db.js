const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function checkDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
        await mongoose.connection.close();
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

checkDb();
