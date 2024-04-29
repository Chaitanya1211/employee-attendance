const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");

router.post("/login", admin.login);
router.post("/register", admin.register);
router.post("/invite/:email", admin.inviteEmployee);
router.get("/allEmployees", admin.allEmployees);
module.exports = router
