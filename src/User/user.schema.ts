import * as joi from 'joi';


export const profileSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({
      'string.empty': 'name is required',
    }),

  address: joi.string().required().messages({
    'string.empty': 'address is required',
  }),

  altNumber: joi
    .string()
    .min(10)
    .max(10)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.empty': 'Alternate number is required',
      'string.pattern.base': 'Please enter a valid number',
      'string.min': 'Please enter a valid number',
      'string.max': 'Please enter a valid number',
    }),

});


