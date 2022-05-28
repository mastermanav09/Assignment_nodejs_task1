const router = require("express").Router();
const userControllers = require("../controllers/user");

router.post("/add", userControllers.addUser);
module.exports = router;
