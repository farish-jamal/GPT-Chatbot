const {getUser} = require("../utils/auth.utils");

async function restrictToLoginUser(req, res, next){
 const userUid = req.cookies?.uid;
 console.log(userUid);
 if(!userUid){
  return res.redirect("/user/login");
 }
 const user = getUser(userUid);
 if(!user){
  return res.redirect("/user/login");
 }
 req.user = user;
 next();
}

module.exports = {
 restrictToLoginUser
}