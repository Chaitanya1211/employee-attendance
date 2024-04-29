const express = require("express");
const router = express.Router();
const employee = require("../controller/employeeController");

router.post("/register", employee.register);
router.post("/login", employee.login);

module.exports = router
