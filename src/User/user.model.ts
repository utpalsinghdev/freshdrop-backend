import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateUser = async (number: string) => {
    const user = await prisma.user.create({
        data: {
            number,
        },

    });
    return user;
}

export const checkUser = async (number: string) => {
    const user = await prisma.user.findUnique({
        where: {
            number,
        },


    });
    return user;
}