// created by Esteban Hernandez at 20200721 23:23.
const router = require("express").Router();
const package = require("./../../../package.json");

router.get("/", (req, res, next) => {
  res.send({
    title: package.name,
    description: package.description,
    version: "v" + package.version,
  });
});
module.exports = router;
