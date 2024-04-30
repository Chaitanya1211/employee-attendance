const Employee = require("../models/employeeModel")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
async function register(req, res) {
    try {
        const {  email, password } = req.body;
        const response = await Employee.findOne({ email: email });
        if (response) {
            res.status(409).json({ message: 'Employee already Exists'});
        } else {
            const password_hash = await bcrypt.hash(password, 10);
            try{
                const createdEmployee = await Employee.create({...req.body,password_hash:password_hash});
                console.log("Employee created")
                res.status(201).json({ message: 'Employee created successfully', employee: createdEmployee });
            }catch(error){
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
        const employee = await Employee.findOne({email:email});

        if(employee){
            // check for password
            const passwordFlag = await employee.matchPassword(password);
            if(passwordFlag){
                // success
                const payload = {
                    id:employee._id,
                    email:employee.email
                }
                const token = jwt.sign(payload,process.env.SECRET_KEY);
                console.log("Login success");
                res.status(200).json({message:"success", token : token})
            }else{
                // incorrect password
                res.status(401).json({message:"failure"})
            }
        }else{
            res.status(404).json({message:'Employee not found'});
        }
    } catch(error) {
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getDetails(req,res){
    try{
        const user = req.user.email;
        const employee = await Employee.findOne({email:user});
        if(employee){
            console.log(employee)
            res.status(200).json({message : "Employee found", profile : employee})
        }else{
            console.log("Employee not found")
            res.status(404).json({message : "Employee not found"})
        }
    }catch(error){
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProfile(req,res){
    try{

    }catch(error){
        console.error('Internal server error', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.register = register;
exports.login = login;
exports.getDetails = getDetails;