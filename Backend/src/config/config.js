const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8080;
const mongo_uri = process.env.MONGO_URL;
const jwt_secret = process.env.JWT_SECRET;
const GOOGLE_USER = process.env.GOOGLE_USER;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

if (!port) {
    console.error("PORT is not defined in environment variables");
    process.exit(1);
}

if (!mongo_uri) {
    console.error("MONGO_URL is not defined in environment variables");
    process.exit(1);
}

if (!jwt_secret) {
    console.error("JWT_SECRET is not defined in environment variables");
    process.exit(1);
}

module.exports = {
    port,
    mongo_uri,
    jwt_secret,
    GOOGLE_USER,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
};
