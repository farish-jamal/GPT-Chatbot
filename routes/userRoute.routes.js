const express = require("express");
const {handleCreateUSer, handleGetUser} = require("../controllers/user.controller");
const route = express.Router();

route.post("/register", handleCreateUSer);
route.get("/register", (req, res)=>{
 res.render("signup");
});
route.post("/login", handleGetUser);

module.exports = route;
