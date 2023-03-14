import { PrismaClient } from "@prisma/client";
import env from "../utils/validateEnv"
import * as jwt from 'jsonwebtoken';
import { CreateOtp, UpdateOtp, checknumber } from "./otp.model";
const prisma = new PrismaClient();


export const generateOtp = async (number: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpData = await checknumber(number);
    if (otpData) {
        const otpData = await UpdateOtp(number, otp.toString());
        return otpData;
    } else {
        const otpData = await CreateOtp(number, otp.toString());
        return otpData;
    }
};
interface JwtPayload {
    number: string;
}
export const verifyOtp = async (number: string, otp: string) => {
    const otpData = await prisma.otp.findFirst({
        where: {
            number: number.toString(),
            otp,
        },
    });

    if (!otpData) {
        return null;
    }

    const timeDiff = (new Date().getTime() - otpData.updatedAt.getTime()) / (1000 * 60);

    if (timeDiff > 5) {
        return null;
    }
    const token = jwt.sign({ number: otpData.number } as JwtPayload, env.JWT_SECRET, { expiresIn: '1w' });
    return token;
};
