// created by Esteban Hernandez at 20200721 23:23.
const router = require("express").Router();
const Login = require("./../core/security/login.js");

router.post("/login", async function (req, res) {
  try {
    let login = new Login();
    let result = {};
    result.data = await login.auth(req.body);
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data:{}, message: e.message };
    res.send(error);
  }
});

module.exports = router;
