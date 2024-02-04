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
 const results = await Response.find({createdBy: userId}).sort({ createdAt: -1 });
//  console.log(results);
 const user = await User.findOne({_id: userId});
 return res.render("specificuser", {
   results : results,
   name: user.firstName
 })
}

async function handleDeleteUser(req, res){
  await User.findByIdAndDelete(req.params.id);
  return res.redirect("/admin");
}

async function handleUpdateUser(req, res){
  const {editId, editFirstName, editRole} = req.body;
  await User.findByIdAndUpdate(editId, {
    firstName: editFirstName,
    role: editRole
  });
  return res.redirect("/admin");
}

module.exports = {
 handleAdminGetAllHistory,
 handleGetSpecificUserForAdmin,
 handleDeleteUser,
 handleUpdateUser,
};