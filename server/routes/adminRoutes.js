const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");
const auth = require("../helper/token");
router.post("/login", admin.login);
router.post("/register", admin.register);
router.post("/invite/:email", admin.inviteEmployee);
router.get("/allEmployees",auth, admin.allEmployees);
module.exports = router
