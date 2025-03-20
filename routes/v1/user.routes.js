const express=require('express');
const userController=require('../../controllers/user.controller');
const authMiddleware=require('../../middleware/auth')
const asyncHandler=require('../../helper/asyncHandler')
const router=express.Router();

const multer = require('multer'); // Import multer

// Set up multer storage and file filtering options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Naming the file
  }
});

const upload = multer({ storage: storage }); // Create the upload middleware

router.post('/upload-photo', authMiddleware.protect, upload.single('photo'), asyncHandler(userController.uploadPhoto))

router.get('/', authMiddleware.protect, asyncHandler(userController.getUser))



router.put('/update-profile', authMiddleware.protect,asyncHandler(userController.updateUserProfile))

module.exports=router;