const Joi = require('joi');

const createServiceSchema = Joi.object().keys({
    serviceName: Joi.string().optional(),
    description: Joi.string().optional(),
    duration: Joi.string().optional(),
    price: Joi.string().optional(),
    active: Joi.string().optional(),
});



module.exports={createServiceSchema}

