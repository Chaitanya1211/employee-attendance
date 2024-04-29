const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected")
}).catch((error) => {
    console.log("Error in connecting " , error)
})

