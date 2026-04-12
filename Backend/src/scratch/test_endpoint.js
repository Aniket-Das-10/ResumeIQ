const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const User = require("../models/user.model");
const { sampleSelfDescription, sampleJobDescription } = require("../../../dummy/temp");

async function runTest() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        // 1. Seed User
        const password = "testpassword123";
        const hashedPassword = await bcrypt.hash(password, 10);
        const testEmail = "testuser@example.com";
        
        await User.deleteMany({ email: testEmail });
        const user = await User.create({
            userName: "testuser",
            email: testEmail,
            password: hashedPassword,
            isVerified: true
        });
        console.log("Test user created");

        // 2. Prepare Form Data
        const pdfPath = path.join(__dirname, "../../../dummy/CV_Aniket Das.pdf");
        if (!fs.existsSync(pdfPath)) {
            throw new Error(`PDF not found at ${pdfPath}`);
        }
        const pdfBuffer = fs.readFileSync(pdfPath);
        const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
        
        const formData = new FormData();
        formData.append("resume", blob, "resume.pdf");
        formData.append("selfDescription", sampleSelfDescription);
        formData.append("jobDescription", sampleJobDescription);

        // 3. Login to get Cookie
        const loginRes = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: testEmail, password })
        });
        
        if (!loginRes.ok) {
            const err = await loginRes.json();
            throw new Error(`Login failed: ${JSON.stringify(err)}`);
        }

        const setCookie = loginRes.headers.get("set-cookie");
        const tokenMatch = setCookie?.match(/token=([^;]+)/);
        const token = tokenMatch ? tokenMatch[1] : "";
        console.log("Logged in successfully");

        // 4. Send Interview Request
        console.log("Sending interview request (this may take a few seconds due to AI processing)...");
        const res = await fetch("http://localhost:5000/api/interview", {
            method: "POST",
            headers: {
                "Cookie": `token=${token}`
            },
            body: formData
        });

        const data = await res.json();
        console.log("API Response:");
        console.log(JSON.stringify(data, null, 2));

        // 5. Cleanup
        await User.deleteOne({ _id: user._id });
        console.log("Test user cleaned up");
        
        await mongoose.connection.close();
        console.log("Test completed successfully");
    } catch (error) {
        console.error("Test failed:", error);
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
}

runTest();
