const express = require("express");
const {handleCreateUSer} = require("../controllers/user.controller");
const route = express.Router();

route.post("/register", handleCreateUSer);

module.exports = route;
