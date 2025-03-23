const Joi = require('joi');

const createServiceSchema = Joi.object({
    serviceName: Joi.string().optional(),
    description: Joi.string().optional(),
    duration: Joi.number().optional(),  
    price: Joi.number().optional(),     
    active: Joi.boolean().optional(),   
});

module.exports = { createServiceSchema };
