const Admin = require("../models/adminModel");
const Employee = require("../models/employeeModel");
const Bug = require("../models/bugModel");
const Attendance = require("../models/attendanceModel");
const Project = require("../models/projectModel");
const Comment = require("../models/commentModel");
const BugHistory = require("../models/bugHistoryModel");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
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

async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({});
    if (projects) {
      res.status(200).json({ message: "Projects found", projects: projects });
    } else {
      res.status(404).json({ message: 'No projects found' });
    }
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getProjectDetails(req, res) {
  // for tester
  const projectId = req.params.projectId;
  const castedId = new mongoose.Types.ObjectId(projectId);
  const projectDetails = await getProject(projectId);
  const total = await Bug.countDocuments({ projectId: castedId });
  const closed = await Bug.countDocuments({ $and: [{ current_status: "CLOSED" }, { projectId: castedId }] });

  if (projectDetails) {
    res.status(200).json({ details: projectDetails, total: total, closed: closed });
  }

}

async function getStatusCount(req, res) {
  const projectId = req.params.projectId;
  const castedId = new mongoose.Types.ObjectId(projectId);
  var counts = {};
  try {
    const total = await Bug.countDocuments({ projectId: castedId });
    counts["total"] = total;
    const closed = await Bug.countDocuments({ $and: [{ current_status: "CLOSED" }, { projectId: castedId }] });
    counts["closed"] = closed;
    const open = await Bug.countDocuments({ $and: [{ current_status: "OPEN" }, { projectId: castedId }] });
    counts["open"] = open;
    const done = await Bug.countDocuments({ $and: [{ current_status: "DONE" }, { projectId: castedId }] });
    counts["done"] = done;
    const inprogress = await Bug.countDocuments({ $and: [{ current_status: "INPROGRESS" }, { projectId: castedId }] });
    counts["inprogress"] = inprogress;
    const recheck = await Bug.countDocuments({ $and: [{ current_status: "RECHECKING" }, { projectId: castedId }] });
    counts["rechecking"] = recheck;
    res.status(200).json({ message: "Details found", count: counts })
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getBugs(req, res) {
  const projectId = req.query.projectId;
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const { employee, priority, curr_status, role } = req.body;
  console.log("Request bidy :", req.body);
  const [bugs, totalItems] = await getProjectBugs(projectId, employee, curr_status, priority, page, pageSize, role);
  if (bugs) {
    res.status(200).json({ message: "Bugs found", bugs: bugs, page: page, totalPages: Math.ceil(totalItems / pageSize) })
  } else {
    res.status(404).json({ message: "Bugs not found" })
  }
}

async function bugDetails(req, res) {
  const tempBugId = req.params.bugId;
  const bugId = new mongoose.Types.ObjectId(req.params.bugId);
      try {
          const bug = await Bug.aggregate([{
              $match: {
                  _id: bugId
              }
          },
          {
              $lookup: {
                  from: "employees",
                  localField: "raisedBy",
                  foreignField: "email",
                  as: "raising_employee"
              }
          },
          {
              $unwind: "$raising_employee"
          },
          {
              $lookup: {
                  from: "employees",
                  localField: "assignedTo",
                  foreignField: "email",
                  as: 'assigned_employee'
              }
          }, {
              $unwind: "$assigned_employee"
          }, {
              $lookup: {
                  from: "employees",
                  localField: "updated_by",
                  foreignField: "email",
                  as: 'updated_employee'
              }
          }, {
              $unwind: {
                  path: "$updated_employee",
                  preserveNullAndEmptyArrays: true
              }
          }, {
              $project: {
                  "title": 1,
                  "description": 1,
                  "images": 1,
                  "raisedByName": "$raising_employee.firstName",
                  "raisedBylastName": "$raising_employee.lastName",
                  "raisedByProfile": "$raising_employee.profileImg",
                  "assignedToName": "$assigned_employee.firstName",
                  "assignedTolastName": "$assigned_employee.lastName",
                  "assignedToProfile": "$assigned_employee.profileImg",
                  "raised_on": 1,
                  "priority": 1,
                  "current_status": 1,
                  "qa_status": 1,
                  "dev_status": 1,
                  "updated_by": 1,
                  "updatedByName": "$updated_employee.firstName",
                  "updatedByLastName": "$updated_employee.lastName",
                  "updatedByProfile": "$updated_employee.profileImg",
                  "updatedAt": 1,
                  "latest_update": 1
              }
          }
          ]);
          if (bug.length != 0) {
              const comments = await bugComments(tempBugId);
              res.status(200).json({ message: "Bug found", bug: bug, comments: comments })
          } else {
              res.status(404).json({ message: "Bug not found" });
          }
      } catch (error) {
          console.error('Internal server error', error);
          res.status(500).json({ error: 'Internal server error' });
      }

}

async function getHistory(req, res) {
  const id = req.params.bugId;
  const history = await getBugHistory(id);
  if (history) {
      res.status(200).json({ message: "History found", history: history })
  } else {
      res.status(404).json({ message: "History not found", history: history });
  }
}


// No route functions
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

async function getProject(projectId) {
  try {
    const result = await Project.find({ _id: projectId });
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    return null;
  }

}

const buildQuery = (projectId, curr_status, priority, employee, role) => {
  let query = {
    projectId: projectId,
  };

  if (curr_status != '') {
    query.current_status = curr_status;
  }

  if (priority != '') {
    query.priority = priority;
  }

  if (employee != "") {
    if (role == "Tester") {
      query.raisedBy = employee
    } else {
      query.assignedTo = employee
    }
  }

  return query;
};

async function getProjectBugs(projectId, employee, curr_status, priority, page, pageSize, role) {
  const castedpageSize = parseInt(pageSize);
  const query = buildQuery(projectId, curr_status, priority, employee, role);
  console.log("Query :", query);
  try {
    const totalItems = await Bug.countDocuments({ projectId: projectId });
    const result = await Bug.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "employees",
          localField: "raisedBy",
          foreignField: "email",
          as: "raising_employee"
        }
      }, {
        $unwind: "$raising_employee"
      },
      {
        $lookup: {
          from: "employees",
          localField: "assignedTo",
          foreignField: "email",
          as: 'assigned_employee'
        }
      }, {
        $unwind: "$assigned_employee"
      }, {
        $lookup: {
          from: "employees",
          localField: "updated_by",
          foreignField: "email",
          as: 'updated_employee'
        }
      }, {
        $unwind: {
          path: "$updated_employee",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $project: {
          "title": 1,
          "description": 1,
          "raisedByName": "$raising_employee.firstName",
          "raisedByProfile": "$raising_employee.profileImg",
          "assignedToName": "$assigned_employee.firstName",
          "assignedToProfile": "$assigned_employee.profileImg",
          "raised_on": 1,
          "priority": 1,
          "current_status": 1,
          "isViewed": 1,
          "updated_by": 1,
          "updatedByName": "$updated_employee.firstName",
          "updatedByLastName": "$updated_employee.lastName",
          "updatedByProfile": "$updated_employee.profileImg",
          "updatedAt": 1,
          "latest_update": 1
        }
      }
    ]).skip((page - 1) * pageSize).limit(castedpageSize).sort({ latest_update: -1 });
    if (result) {
      return [result, totalItems];
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in bugs :", error)
    return null;
  }
}

async function bugComments(bugId) {
  // const bugId = req.params.bugId;
  const allComments = await Comment.aggregate([
      {
          $match: {
              bugId: bugId
          }
      },
      {
          $lookup: {
              from: "employees",
              localField: "by",
              foreignField: "email",
              as: "employee"
          }
      }, {
          $unwind: "$employee"
      }, {
          $project: {
              "bugId": 1,
              "comment": 1,
              "employee.firstName": 1,
              "employee.lastName": 1,
              "employee.profileImg": 1,
              "at": 1
          }
      }
  ]);
  return allComments;
}

async function getBugHistory(bugId) {
  try {
      const history = await BugHistory.aggregate([
          {
              $match: {
                  bugId: bugId
              }
          }, {
              $lookup: {
                  from: "employees",
                  localField: "by",
                  foreignField: "email",
                  as: "employee"
              }
          },
          {
              $unwind: "$employee"
          },
          {
              $project: {
                  "bugId": 1,
                  "by": 1,
                  "type": 1,
                  "data": 1,
                  "emp_f_name": "$employee.firstName",
                  "emp_l_name": "$employee.lastName",
                  "emp_profile": "$employee.profileImg",
                  "time": 1
              }
          }
      ])

      if (history) {
          return history;
      } else {
          return null;
      }
  } catch (e) {
      console.log("error :", e);
      return null;
  }
}


exports.register = register;
exports.login = login;
exports.inviteEmployee = inviteEmployee;
exports.allEmployees = allEmployees;
exports.getSingleEmployee = getSingleEmployee;
exports.createNewProject = createNewProject;
exports.getAllProjects = getAllProjects;
exports.getProjectDetails = getProjectDetails;
exports.getStatusCount = getStatusCount;
exports.getBugs = getBugs;
exports.bugDetails = bugDetails;
exports.getHistory = getHistory;