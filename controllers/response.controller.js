require('dotenv').config();
const Response = require("../models/response.model");
const OpenAI =  require("openai");
const openai = new OpenAI({
 apiKey: process.env.OPEN_AI_KEY,
});

console.log(process.env.OPEN_AI_KEY);

async function main(prompt) {
 console.log(process.env.OPEN_AI_KEY);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
}


async function handleOpenAiResponse(req, res){
 const {prompt} = req.body;
 const response = await main(prompt);
 await Response.create({
  userQuery: prompt,
  botResponse: response
 });
 return res.render("home", {
  response: response,
  prompt: prompt 
 });
}

async function handleGetHistory(req, res){
 const results = await Response.find({});
 return res.render("history", {
  results: results,
 });
}

module.exports = {
 handleOpenAiResponse,
 handleGetHistory
}