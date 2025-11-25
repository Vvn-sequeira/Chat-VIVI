require("dotenv").config()
bodyParser = require("body-parser")
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Ai

const ai = async()=>{
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    prompt = "Joke related to Computer science";
    const result = await model.generateContent(prompt);

    const output = result.response.text();

    console.log(output);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Something went wrong");
  }
}

ai()