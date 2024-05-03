const Admin = require("../models/adminModel");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
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
      const admin = await Admin.findOne({email:email});
      if(admin){
          // check for password
          const passwordFlag = await admin.matchPassword(password);
          if(passwordFlag){
              // success
              const payload = {
                  id:admin._id,
                  email:admin.email
              }
              const token = jwt.sign(payload,process.env.SECRET_KEY);
              console.log("Login success");
              res.status(200).json({message:"success", token : token})
          }else{
              // incorrect password
              res.status(401).json({message:"failure"})
          }
      }else{
          res.status(404).json({message:'Admin not found'});
      }
  } catch(error) {
      console.error('Internal server error', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

async function inviteEmployee(req,res){
    const email = req.params["email"];
    console.log(email);
    const encryptedEmail = Buffer.from(email).toString('base64');
    console.log(encryptedEmail);
    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'Register to platform',
        html: `<p>Click <a href="http://localhost:5173/register/${encryptedEmail}">here</a> to register</p>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error('Internal server error', error);
          res.status(500).json({ error: 'Internal server error. Could not sent mail' });
        } else {
          res.status(200).json({message : "success", info : info})
        }
      })
}

async function allEmployees(req,res){
  try{
    const employees = await Employee.find({}, "firstName lastName email contactNumber profileImg");
    if(employees){
      res.status(200).json({all:employees});
    }else{
      res.status(404).json({message : "No employees found"})
    }
  }catch(error){
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
exports.register = register;
exports.login=login;
exports.inviteEmployee = inviteEmployee;
exports.allEmployees = allEmployees;