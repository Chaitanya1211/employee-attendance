const express= require("express");
const app=express();
const cors = require("cors")
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes")
require('dotenv').config();
require("./db/conn");
app.use(express.json());
app.use(cors())
app.use("/employee",employeeRoutes);
app.use("/admin",adminRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`App running at http://localhost:${process.env.PORT}/`)
})