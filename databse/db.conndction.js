const mongoose = require("mongoose");

async function handleDatabaseConnection(url){
 return mongoose.connect(url);
}

module.exports = {
 handleDatabaseConnection
}