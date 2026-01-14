import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
const router = express.Router();
const uploadDir = 'uploads/';

// Check if directory exists, if not, create it
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure this folder exists in your root directory!
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // file.filename is undefined here. Use fieldname or originalname.
        const extname = path.extname(file.originalname);
        // Generates: image-1736868912345.jpg
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype; // FIX: It is 'mimetype', not 'mimetypes'

    // We use .test() which checks if the pattern exists in the string
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message });
        } else if (req.file) {
            // Note: Windows paths use backslashes. You might want to normalize this.
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path.replace(/\\/g, "/")}`
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    })
})

export default router;