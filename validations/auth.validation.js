const Joi = require('joi');

const signUpValidation = Joi.object().keys({
    name: Joi.string().min(3).max(50).required().trim(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(), // ✅ Enforces valid email format
    password: Joi.string().required().min(8), // ✅ Ensure password is long enough
    role: Joi.string().valid("mentor", "student").required()
});

const signInValidation = Joi.object().keys({
    email: Joi.string().email().required(), // ✅ Enforces valid email
    password: Joi.string().required().min(8) // ✅ Matches signup rules
});

module.exports = { signUpValidation, signInValidation };
