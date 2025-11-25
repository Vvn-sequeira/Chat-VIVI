const { OpenAI } = require("openai/client.js");
require("dotenv").config()

const openai = async()=> {
    const client = new OpenAI({
  apiKey: process.env['OPEN_AI_KEY'], 
});

const response = await client.responses.create({
  model: 'gpt-4o',
  instructions: 'You are a coding assistant that talks like a pirate',
  input: 'Are semicolons optional in JavaScript?',
});

console.log(response.output_text);
}

openai()