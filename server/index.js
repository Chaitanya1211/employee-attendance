const express= require("express");
const app=express();
const cors = require("cors")
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
require('dotenv').config();
require("./db/conn");
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
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