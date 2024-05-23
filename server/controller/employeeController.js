const mongoose = require("mongoose")
const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel");
const Project = require("../models/projectModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Bug = require("../models/bugModel");
const Comment = require("../models/commentModel");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function register(req, res) {
    try {
        const { email, password } = req.body;
        const response = await Employee.findOne({ email: email });
        if (response) {
            res.status(409).json({ message: 'Employee already Exists' });
        } else {
            const password_hash = await bcrypt.hash(password, 10);
            try {
                const createdEmployee = await Employee.create({ ...req.body, password_hash: password_hash });
                console.log("Employee created")
                res.status(201).json({ message: 'Employee created successfully', employee: createdEmployee });
            } catch (error) {
                console.error('Error creating employee:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ email: email });

        if (employee) {
            // check for password
            const passwordFlag = await employee.matchPassword(password);
            if (passwordFlag) {
                // success
                const payload = {
                    id: employee._id,
                    email: employee.email,
                    role: employee.role
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                console.log("Login success");
                res.status(200).json({ message: "success", token: token })
            } else {
                // incorrect password
                res.status(401).json({ message: "failure" })
            }
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getRole(req, res) {
    try {
        const role = req.user.role;
        res.status(200).json({ message: "Role found", role: role });
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getDetails(req, res) {
    try {
        const user = req.user.email;
        const employee = await Employee.findOne({ email: user });
        if (employee) {
            // console.log(employee)
            res.status(200).json({ message: "Employee found", profile: employee, role: req.user.role })
        } else {
            console.log("Employee not found")
            res.status(404).json({ message: "Employee not found" })
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req, res) {
    const email = req.user.email;
    try {
        let newData = { ...req.body };
        const profileImg = req.file;
        let publicUrl;
        console.log("profile :", profileImg);
        if (profileImg) {
            publicUrl = await cloudinary.uploader.upload(profileImg.path)
        }

        try {
            newData["profileImg"] = publicUrl.secure_url;
            const result = await Employee.updateOne({ email: email }, { $set: newData });
            if (result.matchedCount != 0) {
                res.status(200).json({ message: "Profile Details Updated" })
            } else {
                res.status(404).json({ message: "Profile details not updated" })
            }
        } catch (e) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function markLogin(req, res) {
    const email = req.user.email;
    const currentDate = getCurrentDate();
    const currentDateTime = getCurrentDateTime();
    const updateFields = {
        login: currentDateTime,
        isLoggedIn: true
    };

    try {
        const result = await Attendance.findOneAndUpdate({ $and: [{ employeeEmail: email }, { today: currentDate }] }, { $set: updateFields }, { new: true })
        if (result) {
            // attendance marked
            let attendance = await getAllAttendance(email);
            if (attendance.length != 0) {
                res.status(200).json({ message: "Attendance marked", todayStatus: result, attendance: attendance })
            } else {
                res.status(200).json({ message: "Attendance marked", todayStatus: result, attendance: [] })
            }
        } else {
            // attendance not marked
            res.status(500).json({ message: "Attendance not marked. Internal server error" })
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function markLogout(req, res) {
    const email = req.user.email;
    const currentDate = getCurrentDate();
    const currentDateTime = getCurrentDateTime();
    const updateFields = {
        logout: currentDateTime,
        isLoggedOut: true
    };
    try {
        const result = await Attendance.findOneAndUpdate({ $and: [{ employeeEmail: email }, { today: currentDate }] }, { $set: updateFields }, { new: true })
        if (result.nModified != 0) {
            let attendance = await getAllAttendance(email);
            if (attendance.length != 0) {
                res.status(200).json({ message: "Attendance marked. Logged out", todayStatus: result, attendance: attendance })
            } else {
                res.status(200).json({ message: "Attendance marked. Logged out", todayStatus: result, attendance: attendance })
            }
        } else {
            res.status(500).json({ message: "Attendance not marked. Internal server error" })
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function home(req, res) {
    const email = req.user.email;
    const role = req.user.role;
    const current = getCurrentDate();
    try {
        const profile = await Employee.findOne({ email: email }, "firstName lastName email contactNumber profileImg role");
        let todayStatus = await Attendance.findOne({ $and: [{ employeeEmail: email }, { today: current }] });

        if (!profile) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        if (!todayStatus) {
            const currentDate = getCurrentDate();
            const showDate = getCurrentDateAndDayFormatted();
            const newToday = new Attendance({
                employeeEmail: email,
                showDate: showDate,
                today: currentDate,
                isLoggedIn: false,
                isLoggedOut: false
            });
            todayStatus = await newToday.save();
        }

        let attendance = await getAllAttendance(email);
        if (attendance.length != 0) {
            res.status(200).json({ message: "Details found", profile: profile, todayStatus: todayStatus, attendance: attendance, role: role });
        } else {
            res.status(200).json({ message: "Details found", profile: profile, todayStatus: todayStatus, role: role });
        }

    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error', role: role });
    }
}

async function getAllAttendance(email) {
    try {
        const result = await Attendance.find({ employeeEmail: email }).sort({ today: -1 });
        if (result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function getAllProjects(req, res) {
    const role = req.user.role;
    try {
        const projects = await Project.find({});
        if (projects) {
            res.status(200).json({ message: "Projects found", projects: projects, role: role });
        } else {
            res.status(404).json({ message: 'No projects found', role: role });
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProjectDetails(req, res) {
    // for tester
    const projectId = req.params.projectId;
    const role = req.user.role;
    console.log("Role :", role)
    const projectDetails = await getProject(projectId);
    const bugs = await getProjectBugs(projectId);
    if (role == "Tester") {
        if (projectDetails != null) {
            res.status(200).json({ details: projectDetails, bugs: bugs, role: role });
        } else {
            res.status(404).json({ message: "No project found", role: role });
            // console.log("Project not found");
        }

    } else {
        // for developer
        res.status(200).json({ details: projectDetails, bugs: bugs, role: role });
        console.log("Api for developer")
    }
}

async function raiseBug(req, res) {
    console.log("Bug raise request")
    const userEmail = req.user.email;
    const role = req.user.role;
    if (role == "Tester") {
        console.log("Req body", req.body);
        const files = req.files; // Get array of uploaded files
        let publicUrls = [];
        if (files) {

            // Iterate through each file and upload to Cloudinary
            for (const file of files) {
                const { path } = file;
                const result = await cloudinary.uploader.upload(path);
                publicUrls.push(result.secure_url);
            }
            console.log("Uploaded URLs:", publicUrls);
        }

        const newBug = await Bug.create({ ...req.body, raisedBy: userEmail, images: publicUrls });
        console.log("Bug created :", newBug);
        if (newBug) {
            return res.status(201).json({ message: "Bug created", bug: newBug })
        } else {
            return res.status(500).json({ message: "Bug not created" })
        }
    } else {
        // unauthorised access
        return res.status(401).json({ message: "Access restricted" })
    }
}

async function allEmployees(req, res) {
    try {
        const employeeData = await Employee.find({}, 'firstName lastName email')
        if (employeeData) {
            res.status(200).json({ employees: employeeData })
        } else {
            res.status(404).json({ employees: employeeData })
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function bugDetails(req, res) {
    const tempBugId = req.params.bugId;
    const role = req.user.role;
    const bugId = new mongoose.Types.ObjectId(req.params.bugId);
    console.log("bud Id" , bugId);
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
            $unwind : "$raising_employee"
        },
        {
            $lookup:{
                from: "employees",
                localField: "assignedTo",
                foreignField: "email",
                as: 'assigned_employee'
            }
        },{
            $unwind : "$assigned_employee"
        },{
            $lookup: {
                from: "employees",
                localField: "updated_by",
                foreignField: "email",
                as: 'updated_employee'
            }
        },{
            $unwind : {
                path : "$updated_employee",
                preserveNullAndEmptyArrays: true
            }
        },{
            $project:{
                "title": 1,
                "description": 1,
                "images":1,
                "raisedByName": "$raising_employee.firstName",
                "raisedBylastName": "$raising_employee.lastName",
                "raisedByProfile": "$raising_employee.profileImg",
                "assignedToName": "$assigned_employee.firstName",
                "assignedTolastName": "$assigned_employee.lastName",
                "assignedToProfile": "$assigned_employee.profileImg",
                "raised_on": 1,
                "priority": 1,
                "current_status": 1,
                "qa_status":1,
                "dev_status":1,
                "updatedBy" : 1,
                "updatedByName" : "$updated_employee.firstName",
                "updatedByLastName" : "$updated_employee.lastName",
                "updatedByProfile" : "$updated_employee.profileImg",
                "updatedAt":1,
                "latest_update":1
            }
        }
        ]);
        if (bug.length != 0) {
            const comments = await bugComments(tempBugId);
            res.status(200).json({ message: "Bug found", bug: bug, comments : comments, role:role })
        } else {
            res.status(404).json({ message: "Bug not found", role:role });
        }
    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addComment(req,res){
    const {bugId} = req.body;
    const email = req.user.email;
    try{
        const newComment = await Comment.create({...req.body,by:email})
        const comments = await bugComments(bugId);
        if(newComment){
            res.status(201).json({message : "Comment addded successfully", comments:comments})
        }else{
            res.status(500).json({ message:"Comment addition unsuccessfull", error: 'Internal server error', comments:comments });
        }
    }catch(error){
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllComments(req,res){
    const bugId = req.params.bugId;
    try{
        const comments = await bugComments(bugId);
        if(comments.length !=0){
            // comments present
            res.status(200).json({message:"Comments present", comments:comments});
        }else{
            // no comments avaiblable
            res.status(404).json({message:"Comments not present", comments:comments})
        }

    }catch(error){
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
}

async function updateBugStatus(req,res){
    const role=req.user.role;
    const email = req.user.email;
    const {bugId} = req.body;
    const currentDateTime=getISTDate();
    const updatedData={
        updated_by : email,
        latest_update : currentDateTime
    };
    const castedId = new mongoose.Types.ObjectId(bugId);
    try{
        if(role=="Developer"){
            // developer
            const {dev_status} = req.body;
            
            const bugUpdate = await Bug.updateOne({_id:castedId},{$set : {...updatedData, dev_status:dev_status,current_status:dev_status}});
            if(bugUpdate){
                res.status(200).json({message: "Status updated successfully", updated:bugUpdate});
            }else{
                res.status(500).json({message : "Not updated"})
            }
        }else{
            // tester
            const {qa_status} = req.body;
            const bugUpdate = await Bug.updateOne({_id:castedId},{$set : {...updatedData, qa_status:qa_status, current_status:qa_status}});
            if(bugUpdate){
                res.status(200).json({message: "Status updated successfully", updated:bugUpdate});
            }else{
                res.status(500).json({message : "Not updated"})
            }
        }
    }catch(error){
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
    
}
// No route functions

async function bugComments(bugId){
    // const bugId = req.params.bugId;
        const allComments = await Comment.aggregate([
            {
                $match:{
                    bugId : bugId
                }
            },
            {
                $lookup:{
                    from:"employees",
                    localField : "by",
                    foreignField : "email",
                    as:"employee"
                }
            },{
                $unwind:"$employee"
            },{
                $project:{
                    "bugId" : 1,
                    "comment" : 1,
                    "employee.firstName" : 1,
                    "employee.lastName" : 1,
                    "employee.profileImg":1,
                    "at" : 1
                }
            }
        ]);
        return allComments;
    
}

function getCurrentDate() {
    const currentDate = new Date();
    const isoDate = currentDate.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });
    return isoDate.split('T')[0];
}

function getCurrentDateTime() {
    const currentDate = new Date();
    return currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
}

function getCurrentDateAndDayFormatted() {
    const currentDate = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timeZone: 'Asia/Kolkata'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    const formattedDateWithoutOrdinal = formattedDate.replace(/(\d{1,2})(th|st|nd|rd)/, '$1');
    return formattedDateWithoutOrdinal;
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

async function getProjectBugs(projectId) {
    try {
        // const result = await Bug.find({ projectId: projectId });
        const result = await Bug.aggregate([
            {
                $match: {
                    projectId: projectId
                }
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
                $project: {
                    "title": 1,
                    "description": 1,
                    "raisedByName": "$raising_employee.firstName",
                    "raisedByProfile": "$raising_employee.profileImg",
                    "assignedToName": "$assigned_employee.firstName",
                    "assignedToProfile": "$assigned_employee.profileImg",
                    "raised_on": 1,
                    "priority": 1,
                    "current_status": 1
                }
            }
        ])
        if (result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error in bugs :", error)
        return null;
    }
}

function getISTDate() {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate;
}

exports.register = register;
exports.login = login;
exports.getDetails = getDetails;
exports.updateProfile = updateProfile;
exports.markLogin = markLogin;
exports.markLogout = markLogout;
exports.home = home;
exports.getRole = getRole;
exports.getAllProjects = getAllProjects;
exports.getProjectDetails = getProjectDetails;
exports.raiseBug = raiseBug;
exports.allEmployees = allEmployees;
exports.bugDetails = bugDetails;
exports.addComment = addComment;
exports.getAllComments = getAllComments;
exports.updateBugStatus = updateBugStatus;