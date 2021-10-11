"use strict"

require("dotenv").config();
require("colors");

const PORT = +process.env.PORT || 8001;


console.log("");
console.log("Eyepatch Messaging Server Config:".brightCyan);
console.log("PORT:".brightYellow, PORT.toString());
console.log("---------------------------------".brightCyan, "\n");



module.exports = {
  PORT,
};
