const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth.route");
const interviewRouter = require("./routes/interview.route");
const cookieParser = require("cookie-parser")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);



module.exports = app;