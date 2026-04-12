const multer = require("multer");

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 1024 * 1024 * 3
    },
    fileFilter : (req,file,cb) => {
        if(file.mimetype === "application/pdf"){
            cb(null,true);
        }else{
            cb(new Error("Invalid file type"),false);
        }
    }
})

module.exports = upload;