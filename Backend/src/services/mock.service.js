const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const { z } = require("zod");

const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

const evaluationSchema = z.object({
  feedback: z
    .string()
    .describe(
      "Constructive feedback on the answer, mentioning what was good and what could be better.",
    ),
  score: z
    .number()
    .min(0)
    .max(10)
    .describe("Score out of 10 for this specific answer."),
  suggestions: z
    .array(z.string())
    .describe("List of 2-3 specific suggestions or keywords to include."),
});

async function evaluateMockAnswer({
  question,
  answer,
  jobDescription,
  context,
}) {
  const prompt = `
    You are an expert technical and behavioral interviewer.
    Your task is to evaluate a candidate's answer to a specific interview question.

    **Question:** ${question}
    **Candidate's Answer:** ${answer}
    **Job Description Context:** ${jobDescription}
    **Interview Type:** ${context}

    Please provide:
    1. Constructive feedback (be encouraging but professional).
    2. A score out of 10.
    3. Specific suggestions for improvement.

    Return the response in JSON format.
    `;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: evaluationSchema,
      },
    });

    let text = "";
    if (result.response && typeof result.response.text === "function") {
      text = result.response.text();
    } else if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
      text = result.candidates[0].content.parts[0].text;
    }

    if (!text) {
      throw new Error("Empty response from AI");
    }

    // Clean markdown if AI returns it
    const jsonMatch = text.match(/```json\s?([\s\S]*?)\s?```/) || text.match(/```\s?([\s\S]*?)\s?```/);
    const sanitizedText = jsonMatch ? jsonMatch[1].trim() : text.trim();

    if (result.response.usageMetadata) {
      const { promptTokenCount, candidatesTokenCount, totalTokenCount } = result.response.usageMetadata;
      console.log(`📊 [Mock Eval] Tokens Used: ${totalTokenCount} (Prompt: ${promptTokenCount}, Response: ${candidatesTokenCount})`);
    }

    return JSON.parse(sanitizedText);
  } catch (error) {
    console.error("CRITICAL: Gemini Evaluation Error:", error.message);
    // Return a fallback evaluation if AI fails so the interview can continue
    return {
      feedback: "I encountered a temporary technical issue while analyzing your answer. Please continue with the next question while I try to reconnect.",
      score: 5,
      suggestions: ["Ensure your answer is specific and uses technical keywords."],
    };
  }
}

async function chatWithAI({ message, history, jobDescription }) {
  try {
    // Gemini history must alternate roles and start with 'user'
    const validHistory = [];
    let lastRole = null;

    // Limit history to the last 6 turns to save tokens
    const recentHistory = history.slice(-6);
    
    for (const h of recentHistory) {
      const currentRole = h.role === "ai" ? "model" : "user";
      if (currentRole !== lastRole) {
        validHistory.push({
          role: currentRole,
          parts: [{ text: h.text }],
        });
        lastRole = currentRole;
      }
    }

    if (validHistory.length > 0 && validHistory[0].role !== "user") {
      validHistory.shift();
    }

    const chat = genAI
      .getGenerativeModel({ model: "gemini-2.5-flash" })
      .startChat({
        history: validHistory,
        generationConfig: {
          maxOutputTokens: 300, // Reduced from 500
        },
      });

    const prompt = `
      Context: Professional interviewer. Job: ${jobDescription.substring(0, 1000)}.
      Reply to: "${message}". 
      Keep it brief and natural (max 2-3 sentences).
      `;

    const result = await chat.sendMessage(prompt);

    if (result.response.usageMetadata) {
      const { promptTokenCount, candidatesTokenCount, totalTokenCount } = result.response.usageMetadata;
      console.log(`📊 [Mock Chat] Tokens Used: ${totalTokenCount} (Prompt: ${promptTokenCount}, Response: ${candidatesTokenCount})`);
    }

    return result.response.text();
  } catch (error) {
    console.error("CRITICAL: Chat Reply Error:", error.message);
    return "I'm sorry, I'm having a bit of trouble replying right now. Let's continue with the interview—click the button below for the next question!";
  }
}

async function generateOverallSummary(interactions) {
  const prompt = `
    Analyze the following interview interactions and provide an overall performance summary.
    
    Interactions:
    ${JSON.stringify(interactions)}

    Provide a concise summary of strengths, areas for improvement, and a final career advice note.
    Return as a simple text summary (max 150 words).
    `;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return result.response.text();
}

module.exports = { evaluateMockAnswer, chatWithAI, generateOverallSummary };
