const Joi = require('joi');

export const SingleSchema = Joi.object({
  Group_id: Joi.number().required(),
  userId: Joi.number().required(),
});

export const multiSchema = Joi.object({
    Group_id: Joi.number().integer().positive().required().messages({
      'number.base': 'Group ID must be a number',
      'number.integer': 'Group ID must be an integer',
      'number.positive': 'Group ID must be a positive number',
      'any.required': 'Group ID is required',
    }),
    userIds: Joi.array().items(Joi.number().integer().positive()).min(1).required().messages({
      'array.base': 'User IDs must be provided as an array',
      'array.min': 'At least one user ID must be provided',
      'number.base': 'User IDs must be numbers',
      'number.integer': 'User IDs must be integers',
      'number.positive': 'User IDs must be positive numbers',
      'any.required': 'User IDs are required',
    }),
  });