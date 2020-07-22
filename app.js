// created by Esteban Hernandez at 20200721 21:59.
//
// Main routing
let express = require("express");
let index = require("./src/api/router/index");
let security = require("./src/api/router/security");
let setting = require("./src/api/env/settingEnv");
let app = express();
app.use("/", index);
app.listen(setting.node.port, function () {
  console.log(`AMLADI listening on port ${setting.node.port} 🔥`);
});
module.exports = app;