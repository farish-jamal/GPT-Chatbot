const User = require("../models/user.model");
const Response = require("../models/response.model");

async function handleAdminGetAllHistory(req, res){
 const result = await User.find({})
 return res.render("admin", {
   results: result,
 })
}

async function handleGetSpecificUserForAdmin(req, res){
 const {userId} = req.body;
 if(userId == "null") return res.redirect("/admin");
 const results = await Response.find({createdBy: userId});
 const user = await User.findOne({_id: userId});
 return res.render("specificuser", {
   results : results,
   name: user.firstName
 })
}

module.exports = {
 handleAdminGetAllHistory,
 handleGetSpecificUserForAdmin
};