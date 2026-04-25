const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");
const app = express();
const authRouter = require("./routes/auth.route");
const interviewRouter = require("./routes/interview.route");
const mockRouter = require("./routes/mock.route");
const cookieParser = require("cookie-parser")

app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/mock-interview", mockRouter);



module.exports = app;