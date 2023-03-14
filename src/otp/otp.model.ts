import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const CreateOtp = async (number: string, otp: string) => {
    const otpData = await prisma.otp.create({
        data: {
            number,
            otp,
        },

    });
    return otpData;
}
export const UpdateOtp = async (number: string, otp: string) => {
    const otpData = await prisma.otp.update({
        where: {
            number,
        },
        data: {
            otp,
        },

    });
    return otpData;
}

export const checknumber = async (number: string) => {
    const otpData = await prisma.otp.findUnique({
        where: {
            number,
        },

    });
    return otpData;
}