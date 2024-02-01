const express = require("express");
const {
  handleOpenAiResponse,
  handleGetHistory,
  handleClearHistory
} = require("../controllers/response.controller");
const route = express.Router();

route.post("/response", handleOpenAiResponse);
route.get("/history", handleGetHistory);
route.get("/clear", handleClearHistory);

module.exports = route;
