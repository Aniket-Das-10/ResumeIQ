const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser")

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);



module.exports = app;