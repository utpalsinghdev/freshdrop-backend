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
export const CreateUserByAdmin = async (payload: any) => {
    const user = await prisma.user.create({
        data:
            payload,

    });
    return user;
}
export const updateUser = async (payload: any, id: number) => {
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: payload,
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
interface UserInclude {
    orders?: boolean | Record<string, any>;
}



export const getProfile = async (number: string) => {
    const user = await prisma.user.findUnique({
        where: {
            number,
        },
        include: {
            orders: true,
        } as UserInclude,
    });

    return user;
};

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

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            orders: true,
        } as UserInclude,
    });

    return users;
}

export const deleteUser = async (id: number) => {
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });

    return user;
}

export const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            orders: true,
        } as UserInclude,
    });

    return user;
}