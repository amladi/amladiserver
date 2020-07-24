// created by Esteban Hernandez at 20200721 23:23.
const router = require("express").Router();
const Login = require("./../core/security/login.js");

router.post("/login", async function (req, res) {
  try {
    let login = new Login();
    let result = await login.auth(req.body);
    res.send(result);
  } catch (e) {
    let error = { success: false, status: false, message: e };
    res.send(error);
  }
});

module.exports = router;
