const cloudinary=require('cloudinary').v2;
const config = require('../config');
cloudinary.config(config.cloudinary);
const userService=require('../services/user.service');
const httpStatus=require('../util/httpStatus')

const uploadPhoto=async(req,res)=>{

    if(!req.file)
    {
        return res.status(httpStatus.badRequest).json({message:"File not uploaded"})
    }
    const result=await cloudinary.uploader.upload(req.file.path, {
        folder: "user_photos",
        use_filename:true
    })
    const updatedUser=await userService.updateUserPhoto(req.user.id, result.secure_url);
    if(!updatedUser)
    {
        return res.status(httpStatus.notFound).json({message:"User not found"})
    }
   res.status(httpStatus.ok).json({message: "photo uploaded successfully",  photoUrl:updatedUser.photo_url})

}


const updateUserProfile=async(req,res,next)=>{
    const userId=req.user._id
    const profileData=req.body
    
    const updatedUser=await userService.updateUserProfile(userId, profileData);
    if(!updatedUser)
    {
        return next(new ApiError("User not found", httpStatus.notFound))
    }
   res.status(httpStatus.ok).json({message: "profile updated successfully", user:updatedUser })

}

const getUser = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming the user info is available in `req.user`
      const user = await userService.getUserById(userId); // Call the service to get user by ID
      
      if (!user) {
        return res.status(httpStatus.notFound).json({ message: 'User not found' });
      }
  
      // Respond with the user details
      res.status(httpStatus.ok).json({ message: 'User found', user });
    } catch (error) {
      res.status(httpStatus.internalServerError).json({ message: 'Error fetching user data' });
    }
  };

  module.exports = {
    uploadPhoto,
    updateUserProfile,
    getUser
};