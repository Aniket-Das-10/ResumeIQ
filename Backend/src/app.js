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
  ...(config.FRONTEND_URL ? config.FRONTEND_URL.split(",").map(url => url.trim()) : [])
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // If no origin (like mobile apps or curl), allow it
    if (!origin) return callback(null, true);

    // Normalize origins by removing trailing slashes for comparison
    const normalizedOrigin = origin.replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(allowed => 
      allowed && allowed.replace(/\/$/, "") === normalizedOrigin
    ) || (normalizedOrigin.endsWith(".vercel.app") && normalizedOrigin.includes("resume-iq"));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
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