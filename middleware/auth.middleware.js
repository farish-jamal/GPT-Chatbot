const { getUser } = require("../utils/auth.utils");

async function restrictToLoginUser(req, res, next) {
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

async function restrictLoggedInUserToAuthenticateAgain(req, res, next){
 const userUid = req.cookies?.uid;
 if(userUid) return res.redirect("/");
 next();
}

module.exports = {
  restrictToLoginUser,
  restrictLoggedInUserToAuthenticateAgain
};
