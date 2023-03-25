import * as joi from 'joi';

export const otpSchema = joi.object({
    number: joi
      .string()
      .min(10)
      .max(10)
      .pattern(/^\d+$/)
      .required()
      .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Please enter a valid number',
        'string.min': 'Please enter a valid number',
        'string.max': 'Please enter a valid number',
      }),
  
    otp: joi.string().required().messages({
      'string.empty': 'OTP is required',
    }),
  });
  

  export const reqOtpSchema = joi.object({
    number: joi
    .string()
    .min(10)
    .max(10)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please enter a valid number',
      'string.min': 'Please enter a valid number',
      'string.max': 'Please enter a valid number',
    }),

  });