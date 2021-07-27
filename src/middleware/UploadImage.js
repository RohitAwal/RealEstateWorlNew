
const multer = require("multer");
const path = require('path');



const storageF = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'AdminUpload')
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const uploadAdmin = multer({ storage:storageF})

module.exports = uploadAdmin;