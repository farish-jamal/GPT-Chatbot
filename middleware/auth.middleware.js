const { getUser } = require("../utils/auth.utils");

function restrictToLoginUser(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.redirect("/user/login");
  }
  const user = getUser(userUid);
  if (!user) {
    return res.redirect("/user/login");
  }
  req.user = user;
  next();
}

function restrictLoggedInUserToAuthenticateAgain(req, res, next){
 const userUid = req.cookies?.uid;
 if(userUid) return res.redirect("/");
 next();
}

function restrictTo(role){
  return (req, res, next)=>{
    const userRole = req.user.role;
    if(userRole !== role) return res.redirect("/");
    next();
  }
}

module.exports = {
  restrictToLoginUser,
  restrictLoggedInUserToAuthenticateAgain,
  restrictTo
};
