const serviceService = require("../services/service.service");
const httpStatus = require('../util/httpStatus');
const ApiError = require("../helper/apiError");
const { getNext7Days } = require('../util/dateUtils');
const createService = async (req, res, next) => {
    try {

        const mentor = req.user && req.user._id;
        const { serviceName, description, duration, price } = req.body;
        const service = await serviceService.createService({
            mentor,
            serviceName,
            description,
            duration,
            price
        })
        console.log(service);
        toast.success("service created")
        res.status(httpStatus.created).json({ success: true, message: "service created", service })
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
    }


}

const updateService = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId;

        const mentor = req.user && req.user._id;
        const { serviceName, description, duration, price } = req.body;
        const service = await serviceService.updateService(serviceId, mentor, {
            mentor,
            serviceName,
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
        res.status(httpStatus.ok).json({ success: true, service })
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
    }


}

const getServiceByMentor = async (req, res, next) => {
    try {
        const mentorId = req.user._id;
        const services = await serviceService.getServiceByMentor(mentorId);

        if (!services || services.length === 0) {
            return res.status(httpStatus.notFound).json({
                success: false,
                message: "No services found for this mentor",
            });
        }
        res.status(httpStatus.ok).json({ success: true, services })
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
    }
}


const getServicesOfMentor = async (req, res, next) => {
    try {
        const mentorId = req.params.mentorId;
        console.log(mentorId);
        const services = await serviceService.getServicesOfMentor(mentorId);
        console.log("Services retrieved:", services);

        if (!services || services.length === 0) {
            return res.status(httpStatus.ok).json({
                success: false,
                message: "No services found for this mentor",
            });
        }
        res.status(httpStatus.ok).json({ success: true, services })
    }
    catch (error) {
        next(error);  // Pass the error to the global error handler
    }
}

const getServiceById = async (req, res) => {
    try {
      const service = await ServiceModel.findById(req.params.serviceId);
  
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
  
      // Convert Mongoose doc to plain object and inject dynamic slots
      const updatedService = {
        ...service._doc,
        slots: getNext7Days(),
      };
  
      console.log('✅ Service being returned:', updatedService); // Debug log
  
      res.status(200).json({ success: true, service: updatedService });
  
    } catch (error) {
      console.error('❌ Error fetching service:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

module.exports = { createService, updateService, getServiceByMentor, getServiceById, getServicesOfMentor };