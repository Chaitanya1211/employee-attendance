const mongoose = require("mongoose");
function getISTDate() {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate;
}

const bugHistory = mongoose.Schema({
    bugId:{
        type: String,
        required : true,
        ref:'Bug'
    },
    by:{
        type:String,
        required : true
    },
    type:{
        type:String,
        enum :['COMMENT','STATUS'],
        required :true,
    },
    data:{
        type:String,
        required : true
    },
    time :{
        type:Date,
        default : getISTDate
    }
},{
    timestamps : true
});
const BugHistory = mongoose.model('BugHistory', bugHistory);
module.exports = BugHistory;