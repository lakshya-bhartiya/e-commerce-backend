const Joi = require('joi');

const loginSchema = Joi.object({
    
     mobile: Joi.string()
         .pattern(/^[0-9]{10}$/)
         .required()
         .messages({
         "string.empty": "Mobile number is required.",
         "string.pattern.base": "Mobile number must be 10 digits.",
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password cannot exceed 20 characters.',
        }),
        
});

module.exports = loginSchema;
