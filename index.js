const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const responseRoute = require("../routes/response.routes");
const staticRoute = require("../routes/static.routes");
const userRoute = require("../routes/userRoute.routes");
const {restrictToLoginUser, restrictLoggedInUserToAuthenticateAgain} = require("../middleware/auth.middleware");

const {handleDatabaseConnection} = require("../databse/db.conndction");

require('dotenv').config();

const app = express();
const PORT = 7001 || process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

handleDatabaseConnection(process.env.MONGODB_API_KEY).then(()=>{
  console.log("Database Connected");
})

app.use("/api", restrictToLoginUser, responseRoute);
app.use("/user", restrictLoggedInUserToAuthenticateAgain, userRoute);
app.use("/", restrictToLoginUser, staticRoute);

app.listen(PORT, ()=>{
 console.log("Server started");
})

