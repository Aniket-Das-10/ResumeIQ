const app = require("./src/app");
const config = require("./src/config/config");
const dbConnect = require("./src/config/database");

dbConnect();

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});