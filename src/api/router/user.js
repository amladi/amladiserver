const router = require("express").Router();
const User = require("../core/user/profile.js");

router.post("/getProfile", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.getUserInfo(req.body);
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});

router.put("/updateProfile", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.updateProfile(req.body);
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});

router.post("/new", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.new(req.body);
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});

router.post("/isavalible", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.checkAvalible(req.body);
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});

router.post("/forgotpassword", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.forgotpassword(req.body);
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});

router.post("/test", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.testTable();
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});
router.post("/getUsers", async function (req, res) {
  try {
    let user = new User();
    let result = {};
    result.data = await user.getAllUsers();
    result.success = true;
    res.send(result);
  } catch (e) {
    let error = { success: false, data: {}, message: e.message };
    res.send(error);
  }
});


module.exports = router;
