const serviceModel=require('../models/service.model');

const createService=async(serviceData)=>{
    return await serviceModel.create(serviceData);

}

const updateService=async(serviceId,mentorId, updateData)=>{
    return await serviceModel.findByIdAndUpdate({_id:serviceId, mentor:mentorId}, updateData,{new:true})
}

const getServiceByMentor=async(mentorId)=>{
    return await serviceModel.find({mentor:mentorId})
}

const getServiceById=async(serviceId)=>{
    return await serviceModel.find({id:serviceId})
}

module.exports={createService, updateService, getServiceByMentor, getServiceById};