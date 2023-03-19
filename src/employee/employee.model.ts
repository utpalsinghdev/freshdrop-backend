import { EmployeeRole, PrismaClient } from '@prisma/client';
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export interface EmployeeInput {
    name: string;
    number: string;
    email: string;
    password: string;
    role: EmployeeRole;
}


export const CreateEmployee = async ({ name, number, email, password, role }: EmployeeInput) => {
    const employee = await prisma.employee.create({
        data: {
            name,
            number,
            email,
            password,
            role
        }

    });
    return employee;
};

export const GetEmployee = async (email: string) => {
    const employee = await prisma.employee.findUnique({
        where: {
            email
        },
        include: {
            orders: true
        }
    });
    return employee;
};


    