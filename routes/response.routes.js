const express = require("express");
const {handleOpenAiResponse, handleGetHistory} =  require("../controllers/response.controller");
const route = express.Router();

route.post("/response",handleOpenAiResponse);
route.get("/history", handleGetHistory);

module.exports = route;