const express = require('express');
const router = express.Router();
const multer  = require('multer')
require('dotenv').config();

//multer local storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

const fileFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

//const uploadLocal = multer({ storage: storage, fileFilter: fileFilter });


//Multer AWS S3 storage
// Import AWS SDK
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

// // Create S3 service object
// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// const multerS3 = require('multer-s3');

// const BUCKET_NAME = process.env.BUCKET_NAME;

// Configure AWS SDK
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
//   });



const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      cb(null, '')
    }
  })
  
  const upload = multer({ storage });


  router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(500).send({ message: 'Upload fail' });
    } else {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: Date.now() + '-' + req.file.originalname, 
        Body: req.file.buffer
      };
      
      s3.upload(params, function(err, data) {
        if (err) {
          return res.status(500).send({ message: 'S3 upload fail' });
        } else {
          return res.status(200).send({ message: 'S3 upload successful', file: data });
        }
      });
    }
  });  


// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     acl: 'public-read', // to make the files public
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   }),
//     fileFilter: fileFilter
// });

// router.post('/', upload.single('image'), (req, res) => {
//     if (!req.file) {
//       return res.status(500).send({ message: 'Upload fail' });
//     } else {
//       return res.status(200).send({ message: 'Upload successful', file: req.file });
//     }
//   });


//export router
module.exports = router;  
  
