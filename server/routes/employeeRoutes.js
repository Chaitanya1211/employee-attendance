const express = require("express");
const router = express.Router();
const employee = require("../controller/employeeController");
const auth = require("../helper/token")
router.post("/register", employee.register);
router.post("/login", employee.login);
router.get("/profile", auth,employee.getDetails);
module.exports = router
