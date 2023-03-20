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
  });
  

  