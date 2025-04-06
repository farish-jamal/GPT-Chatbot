require("dotenv").config();
const Response = require("../models/response.model");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    const text = response.candidates[0].content.parts[0].text;
    console.log(text, "Gemini Response");
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred.";
  }
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
  const results = await Response.find({createdBy: req.user.id}).sort({ createdAt: -1 });
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
  handleGetHistory(req, res);
  return res.redirect("/api/history");
}

async function handleClearSpecificHistory(req, res){
  await Response.findByIdAndDelete(req.params.id);
  handleGetHistory(req, res);
  return res.redirect("/api/history");
}

module.exports = {
  handleOpenAiResponse,
  handleGetHistory,
  handleClearHistory,
  handleClearSpecificHistory
};
