import "dotenv/config"

const responseByAI = async(message)=> {
     try {
    const model = "gemini-2.0-flash" 
    //  const prompt = "Joke related to Computer science";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_GEMINI_KEY}`;

    const Options = {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents : [{
          parts: [{
            text:message
          }]
      }]
      })
    }
  
    const result = await fetch(url , Options)
    const data = await result.json() 
    const Final = (data.candidates[0].content.parts[0].text)
    // console.log(Final)
    // res.status(200).send(Final)
    return Final
    
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

export default responseByAI;