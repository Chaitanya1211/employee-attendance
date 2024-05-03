const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
                    email: employee.email
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

async function getDetails(req, res) {
    try {
        const user = req.user.email;
        const employee = await Employee.findOne({ email: user });
        if (employee) {
            // console.log(employee)
            res.status(200).json({ message: "Employee found", profile: employee })
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
    // const attendance={};
    const email = req.user.email;
    const currentDate = getCurrentDate();
    const currentDateTime = getCurrentDateTime();
    const updateFields = {
        login: currentDateTime,
        isLoggedIn: true
    };

    try {
        const result = await Attendance.findOneAndUpdate({ $and: [{ employeeEmail: email }, { today: currentDate }] }, { $set: updateFields },{new:true})
        if (result) {
            // attendance marked
            res.status(200).json({ message: "Attendance marked", todayStatus : result })
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
        const result = await Attendance.findOneAndUpdate({ $and: [{ employeeEmail: email }, { today: currentDate }] }, { $set: updateFields },{new:true})
        if (result.nModified != 0) {
            res.status(200).json({ message: "Attendance marked. Logged out", todayStatus :result })
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
    const current = getCurrentDate();
    try {
        const profile = await Employee.findOne({ email: email }, "firstName lastName email contactNumber");
        let todayStatus = await Attendance.findOne({ $and: [{ employeeEmail: email }, { today: current }] });

        if (!profile) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        if (!todayStatus) {
            const currentDate = getCurrentDate();
            const newToday = new Attendance({
                employeeEmail: email,
                today: currentDate,
                isLoggedIn: false,
                isLoggedOut: false
            });
            todayStatus = await newToday.save();
        }

        res.status(200).json({ message: "Details found", profile: profile, todayStatus: todayStatus });

    } catch (error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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

exports.register = register;
exports.login = login;
exports.getDetails = getDetails;
exports.updateProfile = updateProfile;
exports.markLogin = markLogin;
exports.markLogout = markLogout;
exports.home = home;