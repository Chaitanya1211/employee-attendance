const express= require("express");
const app=express();
const cors = require("cors")
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const fileUpload = require("express-fileupload");
require('dotenv').config();
require("./db/conn");
app.use(express.json());
app.use(cors())
app.use("/employee",employeeRoutes);
app.use("/admin",adminRoutes);
app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
app.listen(process.env.PORT,()=>{
    console.log(`App running at http://localhost:${process.env.PORT}/`)
})