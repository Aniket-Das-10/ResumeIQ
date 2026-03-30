const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8080;
const mongo_uri = process.env.MONGO_URL;
if (!port) {
    console.error("PORT is not defined in environment variables");
    process.exit(1);
}

if (!mongo_uri) {
    console.error("MONGO_URL is not defined in environment variables");
    process.exit(1);
}

module.exports = {
    port,
    mongo_uri,
};
