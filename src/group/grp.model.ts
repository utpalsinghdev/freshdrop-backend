import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const CreateGroup = async (name: string) => {
    const group = await prisma.group.create({
        data: {
            name,
        },
    });
    return group;
}

export const AllGroups = async () => {
    const groups = await prisma.group.findMany({
        include: {
            users: {
                include: {
                    orders: true,
                }
            },

        },
    });
    return groups;
};

export const getGroup = async (id: number) => {
    const group = await prisma.group.findUnique({
        where: {
            id,
        },
        include: {
            users: {
                include: {
                    orders: true,
                }
            },

        },
    });
    return group;
};

export const addSingleUserToGroup = async (userId: number, groupId: number) => {
    const group = await prisma.group.update({
        where: {
            id: groupId,
        },
        data: {
            users: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    return group;
};

interface UserInput {
    userId: number;
}


export const addMultipleUsersToGroup = async (userInputs: UserInput[], groupId: number) => {
    const userIds = userInputs.map((userInput) => userInput.userId);

    const group = await prisma.group.update({
        where: {
            id: groupId,
        },
        data: {
            users: {
                connect: userIds.map((id) => {
                    return { id };
                }),
            },
        },
        include: {
            users: true,
        },
    });

    return group;
};

export const deleteGroup = async (id: number) => {
    const group = await prisma.group.delete({
        where: {
            id,
        },
    });
    return group;
};