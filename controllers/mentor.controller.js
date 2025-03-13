const ApiError = require('../helper/apiError');
const mentorService=require('../services/mentor.service');
const httpStatus = require('../util/httpStatus');

const getAllMentors=async(req,res,next)=>{
    const mentors= await mentorService.getAllMentors();
    res.status(httpStatus.ok).json({success:true,
        mentors
    })
};

const getMentorinfoByUsername=async(req,res,next)=>{
    const mentor= await mentorService.getMentorByUsername();
    if(!mentor)
    {
        return next(new ApiError(httpStatus.notFound,"Mentor not Found"))
    }
    res.status(httpStatus.ok).json({success:true,
        mentor
    })
}