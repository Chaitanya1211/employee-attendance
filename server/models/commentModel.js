const mongoose = require("mongoose");
function getISTDate() {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is UTC+5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate;
  }

const commentSchema = mongoose.Schema({
    bugId:{
        type : String,
        required : true
    },
    comment :{
        type : String,
        required : true
    },
    by:{
        type : String,
        required : true
    },
    at:{
        type: Date,
        default: getISTDate
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;