const express=require('express');
const serviceController=require('../../controllers/service.controller');
const asyncHandler=require('../../helper/asyncHandler');
const validate=require('../../middleware/validate')
const authMiddleware=require('../../middleware/auth');
const {createServiceSchema}=require('../../validations/service.validation')


const router=express.Router();

router.post('/',validate(createServiceSchema), authMiddleware.protect, authMiddleware.restrictTo("mentor"), asyncHandler(serviceController.createService));

router.post('/:serviceId',validate(createServiceSchema), authMiddleware.protect, authMiddleware.restrictTo("mentor"), asyncHandler(serviceController.updateService))

router.get('/', authMiddleware.protect, authMiddleware.restrictTo("mentor"), asyncHandler(serviceController.getServiceByMentor))

router.get('/:serviceId', authMiddleware.protect, authMiddleware.restrictTo("mentor"), asyncHandler(serviceController.getServiceById))


















module.exports=router;