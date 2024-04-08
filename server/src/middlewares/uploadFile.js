"use strict";

//packages
import multer from "multer";

const userImageUploadDirectory = "public/images/users";

const maxImageSize = 2097152;

const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, userImageUploadDirectory)
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})


const fileFilter = (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
        return cb(new Error("File type is not allowed"), false);
    }
    cb(null, true);
}

const uploadUserImg = multer({
    storage: userStorage,
    limits: { fileSize: maxImageSize },
    fileFilter: fileFilter
});


export {
    uploadUserImg,

}