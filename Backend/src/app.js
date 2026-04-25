const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");
const app = express();
const authRouter = require("./routes/auth.route");
const interviewRouter = require("./routes/interview.route");
const mockRouter = require("./routes/mock.route");
const cookieParser = require("cookie-parser")

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  config.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/mock-interview", mockRouter);



module.exports = app;