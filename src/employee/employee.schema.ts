import Joi from 'joi';

export const employeeSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
    number: Joi.string().pattern(/^[0-9]+$/).required(),
    role: Joi.string().valid('ADMIN', 'DELIVERY').required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

