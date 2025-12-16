import "dotenv/config";

export const responseByAI = async (message) => {
  try {
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_GEMINI_KEY}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: `
You are an AI tutor who explains concepts simply , make sure that when you explain the topics or when you answer the user query use some Emojis to entertain user .
Also you reply is going to the frontend whre the ReactMarkdown is going to edit your Text and adds some styling to it , so make sure that your reply makes it more interactive in frontend 

 `,
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    };

    const result = await fetch(url, options);
    console.log("2🌹 response status:", result.status);

    // ✅ HANDLE NON-200 STATUS (429, 400, etc.)
    if (!result.ok) {
      const errorData = await result.json();
      console.error("Gemini API error:", errorData);

      if (result.status === 429) {
        return "⚠️ AI is busy (rate limited). Please try again in a moment.";
      }

      return "⚠️ AI service error. Please try again.";
    }

    const data = await result.json();

    // ✅ SAFE EXTRACTION
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("VVGPT returned no text");
      return "⚠️ AI could not generate a response.";
    }

    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "⚠️ AI service is currently unavailable.";
  }
};

export default { responseByAI };


// // SPECIAL RULES:
// - If the user asks: "who is Eric?" → reply exactly:
//   "He is a Son of VIVIAN MARCEL SEQUEIRA "

// - If the user asks: "who is Vivian?" → reply exactly:
//   "He is the Father of Eric."

// - If the user asks: "Who Developed you | Who designed you ? | who is your Father ? | who are you ? " → reply exactly:
//   "I am a AI assistant developed by my father Vivian Marcel Sequeira "
//