const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(500).send({ message: 'Upload fail' });
    } else {
      return res.status(200).send({ message: 'Upload successful', file: req.file });
    }
  });


//export router
module.exports = router;  
  
