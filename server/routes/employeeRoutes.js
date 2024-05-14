const express = require("express");
const router = express.Router();
const employee = require("../controller/employeeController");
const auth = require("../helper/token");
const upload = require("../helper/multer");
router.post("/register", employee.register);
router.post("/login", employee.login);
router.get("/profile", auth, employee.getDetails);
router.put("/profileUpdate", auth, upload.single('profileImg'), employee.updateProfile);
router.put("/markLogin", auth, employee.markLogin);
router.put("/markLogout", auth, employee.markLogout);
router.get("/home", auth, employee.home);
router.get("/attendances", auth);
router.get('/getRole',auth, employee.getRole);
router.get("/projects",auth, employee.getAllProjects);
router.get("/project/:projectId",auth,employee.getProjectDetails);
router.post('/newBug',auth);
module.exports = router
