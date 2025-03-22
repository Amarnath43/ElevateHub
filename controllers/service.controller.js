const service=require('../services/service.service');
const httpStatus = require('../util/httpStatus');
const ApiError = require("../helper/apiError");
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
    catch (error) {
        next(error);  // Pass the error to the global error handler
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

         if (!service) {
              throw new ApiError(
                httpStatus.notFound,
                "Service not found"
              );
            }
        res.status(httpStatus.ok).json({success:true, service})
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
      }
   

}

const getServiceByMentor=async(req,res,next)=>{
    try{
        const mentorId=req.user._id;
        const services=await service.getServiceByMentor(mentorId);

         if (!services || services.length === 0) {
              return res.status(httpStatus.notFound).json({
                success: false,
                message: "No services found for this mentor",
              });
            }
        res.status(httpStatus.ok).json({success:true, services})
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
      }
}

const getServiceById=async(req,res,next)=>{
    try{
        const serviceId = req.params.serviceId;
        const service=await service.getServiceById(serviceId);
        res.status(httpStatus.ok).json({success:true, service})
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
      }
}

module.exports={createService,updateService,getServiceByMentor,getServiceById};