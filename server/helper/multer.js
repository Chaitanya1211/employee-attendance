const multer = require("multer");
const path = require('path');
const uploadFolder = path.resolve(__dirname, 'E:/attendance/uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // File naming scheme
    }
})
const upload = multer({storage : storage});

module.exports = upload;