import { Request, Response } from 'express';
import { generateOtp, verifyOtp } from './otp.services';
import { otpSchema, reqOtpSchema } from './otp.schema';
import { CreateUser, GetUser } from '../User/user.services';
export const generateOtpController = async (req: Request, res: Response) => {

    try {
        const InputBody = req.body;
        const { error } = reqOtpSchema.validate(InputBody);
        if (error) {
            throw new Error(error.message);
        }

        const otpData = await generateOtp(InputBody.number);
        res.status(201).json({ message: 'OTP generated successfully', otpData });
    } catch (error) {
        res.status(400).json({ message: error.message });

    }

};

export const verifyOtpController = async (req: Request, res: Response) => {
    try {
        const InputBody = req.body;
        const { error } = otpSchema.validate(InputBody);
        if (error) {
            throw new Error(error.message);
        }
        const token = await verifyOtp(InputBody.number, InputBody.otp);
        if (!token) {
            res.status(401).json({ message: 'Invalid OTP or Expired' });
            return;
        }
        const user = await GetUser(InputBody.number);
        if (!user) {
            const user = await CreateUser(InputBody.number);
            res.status(201).json({ message: 'Thanks for joining', token, user });
        } else {

            res.status(200).json({ message: 'Welcome back', token, user });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
