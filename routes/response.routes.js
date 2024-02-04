const express = require("express");
const {
  handleOpenAiResponse,
  handleGetHistory,
  handleClearHistory,
  handleClearSpecificHistory
} = require("../controllers/response.controller");
const route = express.Router();

route.post("/response", handleOpenAiResponse);
route.get("/history", handleGetHistory);
route.get("/clear", handleClearHistory);
route.get("/clear/:id", handleClearSpecificHistory);

module.exports = route;
