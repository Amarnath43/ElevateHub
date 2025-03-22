const service=require('../services/service.service');
const httpStatus = require('../util/httpStatus');
const createService=async(req,res,next)=>{
    try{

        const mentorId=req.user._id;
        const {name,description, duration, price}=req.body;
        const service=await service.createService({
            name,
            description,
            duration,
            price
        })
        res.status(httpStatus.created).json({success:true, message:"service created", service})
    }
    catch(e)
    {
        console.log(e)
    }
   

}

const updateService=async(req,res,next)=>{
    try{
        const serviceId = req.params.serviceId;

        const mentorId=req.user._id;
        const {name,description, duration, price}=req.body;
        const service=await service.updateService(serviceId, mentorId, {
            name,
            description,
            duration,
            price
        })
        res.status(httpStatus.ok).json({success:true, service})
    }
    catch(e)
    {
        console.log(e)
    }
   

}

const getServiceByMentor=async(req,res,next)=>{
    try{
        const mentorId=req.user._id;
        const services=await service.getServiceByMentor(mentorId);
        res.status(httpStatus.ok).json({success:true, services})
    }
    catch(e)
    {
        console.log(e);
    }
}

const getServiceById=async(req,res,next)=>{
    try{
        const serviceId = req.params.serviceId;
        const service=await service.getServiceById(serviceId);
        res.status(httpStatus.ok).json({success:true, service})
    }
    catch(e)
    {
        console.log(e);
    }
}