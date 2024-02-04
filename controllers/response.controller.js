require("dotenv").config();
const Response = require("../models/response.model");
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

async function main(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
}

async function handleOpenAiResponse(req, res) {
  const { prompt } = req.body;
  const response = await main(prompt);
  await Response.create({
    userQuery: prompt,
    botResponse: response,
    createdBy: req.user.id,
  });
  return res.render("home", {
    firstName: req.user.firstName,
    response: response,
    prompt: prompt,
  });
}

async function handleGetHistory(req, res) {
  const results = await Response.find({createdBy: req.user.id}).sort({ createdAt: -1 });;
  return res.render("userprofile", {
    results: results,
    firstName: req.user.firstName,
    role: req.user.role,
    email: req.user.email,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
    id: req.user.id
  });
}

async function handleClearHistory(req, res){
  await Response.deleteMany({createdBy: req.user.id});
  res.redirect("/api/history");
  return res.render("userprofile", {
    results: null,
    firstName: req.user.firstName,
    role: req.user.role,
    email: req.user.email,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
    id: req.user.id
  });
}

async function handleClearSpecificHistory(req, res){
  await Response.findByIdAndDelete(req.params.id);
  res.redirect("/api/history");
  return res.render("userprofile", {
    results: null,
    firstName: req.user.firstName,
    role: req.user.role,
    email: req.user.email,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
    id: req.user.id
  });
}

module.exports = {
  handleOpenAiResponse,
  handleGetHistory,
  handleClearHistory,
  handleClearSpecificHistory
};
