import { EmployeeRole, PrismaClient } from '@prisma/client';
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export interface EmployeeInput {
    id?: number;
    name: string;
    number: string;
    email?: string;
    password?: string;
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


export const getAllEmployees = async () => {
    const employees = await prisma.employee.findMany({
        where: {
            role: {
                not: EmployeeRole.SUPERADMIN,
            },

        }
    });

    return employees;
}

export const getEmployeeById = async (id: number) => {
    const employee = await prisma.employee.findUnique({
        where: {
            Employee_id: id
        }
    });

    return employee;
}

export const updateEmployee = async ({ id, name, number, role }: EmployeeInput) => {
    const employee = await prisma.employee.update({
        where: {
            Employee_id: id
        },
        data: {
            name,
            number,
            role
        }

    });
    return employee;
};

export const deleteEmployee = async (id: number) => {
    const employee = await prisma.employee.delete({
        where: {
            Employee_id: id
        }
    });
    return employee;
}

