const express=require('express');
const userController=require('../../controllers/user.controller');
const authMiddleware=require('../../middleware/auth')
const asyncHandler=require('../../helper/asyncHandler')

const router=express.Router;

router.post('/upload-photo', authMiddleware.protect, upload.single, asyncHandler(userController.uploadPhoto))

router.get('/', authMiddleware.protect, asyncHandler(userController.getUser))



router.put('/update-profile', authMiddleware.protect,asyncHandler(userController.updateUserProfile))

module.exports=router;