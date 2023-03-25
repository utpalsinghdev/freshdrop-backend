import Joi from 'joi';

export const employeeSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
    number: Joi.string().pattern(/^[0-9]+$/).required(),
    role: Joi.string().valid('ADMIN', 'DELIVERY', 'SUPERADMIN').required(),
});
export const updateemployeeSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().pattern(/^[0-9]+$/).required(),
    role: Joi.string().valid('ADMIN', 'DELIVERY').required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const createSchema = Joi.object({
    number: Joi.string().pattern(/^[0-9]+$/).required(),
    altNumber: Joi.string().pattern(/^[0-9]+$/).optional(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    bottles: Joi.number().integer().min(0).required(),
    balance: Joi.number().min(0).required(),
    perBottleCharge: Joi.number().integer().min(1).required(),
    groupId: Joi.number().integer().min(1).optional()
});
export const updateuserSchema = Joi.object({
    altNumber: Joi.string().pattern(/^[0-9]+$/).optional(),
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    bottles: Joi.number().integer().min(0).optional(),
    balance: Joi.number().min(0).optional(),
    perBottleCharge: Joi.number().integer().min(1).optional(),
    groupId: Joi.number().integer().min(1).optional()

});