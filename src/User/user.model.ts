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
interface UserInput {
    number: string;
    name: string;
    address: string;
}



export const getProfile = async (number: string) => {
    const user = await prisma.user.findUnique({
        where: {
            number,
        },
        include: {
            orders: true,
        },
    })

    return user
}

export const profile = async (userInput: UserInput) => {
    const { number, name, address } = userInput
    const user = await prisma.user.update({
        where: {
            number,
        },
        data: {
            name,
            address,
        },
    })

    return user
}