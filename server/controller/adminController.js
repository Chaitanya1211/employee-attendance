const Admin = require("../models/adminModel");
const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel");
const Project = require("../models/projectModel");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const result = await Admin.findOne({ email: email })
    if (result) {
      res.status(409).json({ message: "Employee Already exists" })
    } else {
      const password_hash = await bcrypt.hash(password, 10);
      const createdAdmin = await Admin.create({ ...req.body, password_hash: password_hash });
      res.status(201).json({ message: 'Admin created successfully', admin: createdAdmin });
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      // check for password
      const passwordFlag = await admin.matchPassword(password);
      if (passwordFlag) {
        // success
        const payload = {
          id: admin._id,
          email: admin.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        console.log("Login success");
        res.status(200).json({ message: "success", token: token })
      } else {
        // incorrect password
        res.status(401).json({ message: "failure" })
      }
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function inviteEmployee(req, res) {
  const { email } = req.body;
  let inviteData = req.body;
  const encryptedData = Buffer.from(JSON.stringify(inviteData)).toString('base64');;

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'Register to platform',
    html: emailTemplate(encryptedData)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Internal server error', error);
      res.status(500).json({ error: 'Internal server error. Could not sent mail' });
    } else {
      res.status(200).json({ message: "success", info: info })
    }
  })
}

async function allEmployees(req, res) {
  try {
    const employees = await Employee.find({}, "firstName lastName email contactNumber profileImg role");
    if (employees) {
      res.status(200).json({ all: employees });
    } else {
      res.status(404).json({ message: "No employees found" })
    }
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getSingleEmployee(req, res) {
  const { employee } = req.body;
  console.log("request made")
  try {
    // get employee profile
    const profile = await Employee.findOne({ email: employee });
    if (profile) {
      const attendance = await Attendance.find({ employeeEmail: employee }).sort({ today: -1 });
      res.status(200).json({ message: "Employee Found", profile: profile, attendance: attendance });
    } else {
      res.status(404).json({ message: "Employee Not found" });
    }

  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // get employee attendance

}

async function createNewProject(req, res) {
  try {
    let projectImg = req.file;
    let imageUrl;
    let publicUrl;
    if (projectImg) {
      publicUrl = await cloudinary.uploader.upload(projectImg.path);
      imageUrl = publicUrl.secure_url;
    }
    const projectId = generateRandomFourDigitNumber();
    const newProject = await Project.create({ ...req.body, projectId: projectId, projectImage: imageUrl });
    if (newProject) {
      console.log("New project created");
      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } else {
      res.status(500).json({ error: 'Internal server error', message: "Project could notbe created" });
    }
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllProjects(req,res){
  try{
    const projects = await Project.find({});
    if(projects){
      res.status(200).json({message : "Projects found", projects : projects});
    }else{
      res.status(404).json({ message: 'No projects found' });
    }
  }catch(error){
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
function emailTemplate(encryptedEmail) {
  return `<div class="row">
  <div class="col-12">
      <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: transparent; margin: 0;">
          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
              <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
              <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                  <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                      <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; margin: 0; border: none;">
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                              <td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; color: #495057; font-size: 14px; vertical-align: top; margin: 0;padding: 30px; box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03); ;border-radius: 7px; background-color: #fff;" valign="top">
                                  <meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />
                                  <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                              Please confirm your email address by clicking the link below.
                                          </td>
                                      </tr>
                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                              We may need to send you critical information about our service and it is important that we have an accurate email address.
                                          </td>
                                      </tr>
                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                          <td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                              <a href="http://localhost:5173/register/${encryptedEmail}" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #34c38f; margin: 0; border-color: #34c38f; border-style: solid; border-width: 8px 16px;">Confirm
                                                  email address</a>
                                          </td>
                                      </tr>
                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                              <b>Skote</b>
                                              <p>Support Team</p>
                                          </td>
                                      </tr>

                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                          <td class="content-block" style="text-align: center;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0;" valign="top">
                                              © 2021 Skote
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
              </td>
          </tr>
      </table>
      <!-- end table -->
  </div>
</div>`;
}
function generateRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

exports.register = register;
exports.login = login;
exports.inviteEmployee = inviteEmployee;
exports.allEmployees = allEmployees;
exports.getSingleEmployee = getSingleEmployee;
exports.createNewProject = createNewProject;
exports.getAllProjects = getAllProjects;