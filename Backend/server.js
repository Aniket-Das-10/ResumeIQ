const app = require("./src/app");
const config = require("./src/config/config");
const dbConnect = require("./src/config/database");
const { generateInterviewReport } = require("./src/services/ai.service");
const { sampleResume, sampleJobDescription, sampleSelfDescription } = require("./src/services/temp");

dbConnect();

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

generateInterviewReport({resumeText: sampleResume, jobDescription: sampleJobDescription, selfDescription: sampleSelfDescription})
    .then(report => console.log("Final Report:", JSON.stringify(report, null, 2)))
    .catch(err => console.error("Report Generation Failed:", err));
