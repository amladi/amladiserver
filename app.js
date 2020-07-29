// created by Esteban Hernandez at 20200721 21:59.
//
// Main routing
let express = require("express");
let index = require("./src/api/router/index");
let security = require("./src/api/router/security");
let user = require("./src/api/router/user");
let setting = require("./src/env/settingEnv");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json({ limit: '5000kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("devevaluatesbe/", index);
app.use("devevaluatesbe/security", security);
app.use("devevaluatesbe/user", user);
app.listen(setting.node.port, function () {
  console.log(`AMLADI listening on port ${setting.node.port} 🔥`);
});
module.exports = app;
