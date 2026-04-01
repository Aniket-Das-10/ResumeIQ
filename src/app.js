const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth.route");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api/auth", authRouter);



module.exports = app;