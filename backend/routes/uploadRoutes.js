import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!'); // error message
    }
}

const upload = multer({
    storage,
});

router.post('/', upload.single('image'), (req, res) => {
  const imagePath = `/uploads/${req.file.filename}`;
    res.send({
        message: 'Image uploaded',
        imagePath,
    })
});

export default router;