const express = require("express");
const router = express.Router();
const employee = require("../controller/employeeController");
const auth = require("../helper/token");
const upload = require("../helper/multer");
router.post("/register", employee.register);
router.post("/login", employee.login);
router.get("/profile", auth, employee.getDetails);
router.put("/profileUpdate", auth, upload.single('profileImg'), employee.updateProfile);
router.post("/markLogin", auth, employee.markLogin);
router.put("/markLogout", auth, employee.markLogout);
module.exports = router
