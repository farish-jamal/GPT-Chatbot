const express = require("express");

const {restrictTo} = require("../middleware/auth.middleware.js");
const {handleAdminGetAllHistory, handleGetSpecificUserForAdmin} = require("../controllers/admin.controller.js");

const route = express.Router();

route.get("/", restrictTo("ADMIN"), handleAdminGetAllHistory);

route.post("/", handleGetSpecificUserForAdmin);

module.exports = route;