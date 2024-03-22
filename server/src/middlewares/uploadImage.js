
import multer from "multer";
import path from "path"

const userImageUploadDirectory = "public/images/users";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, userImageUploadDirectory)
    },

    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(null, Date.now() + "-" + file.originalname.replace(extname, "") + extname);
    }
})

const upload = multer({ storage: storage });

export default upload;