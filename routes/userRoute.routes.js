const express = require("express");
const {handleCreateUSer, handleGetUser} = require("../controllers/user.controller");
const route = express.Router();

route.post("/register", handleCreateUSer);
route.post("/login", handleGetUser);

module.exports = route;
