import * as bcrypt from "bcryptjs"
import * as EmployeeModal from "./employee.model"
import { EmployeeInput } from "./employee.model"
import env from "../utils/validateEnv"
import * as jwt from 'jsonwebtoken';
import { EmployeeRole } from "@prisma/client";
export const CreateUser = async ({ email, password, name, number, role }: EmployeeInput) => {


    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await EmployeeModal.CreateEmployee({ email, password: hashedPassword, name, number, role });

    return employee;
}


export const getEmployeee = async (email: string) => {
    const employee = await EmployeeModal.GetEmployee(email);
    return employee;
}

interface JwtPayload {
    email: string;
    role: string;
}
export const loginEmployee = async (email: string, password: string) => {
    const employee = await EmployeeModal.GetEmployee(email);
    if (!employee) {
        return null;
    }
    const valid = await bcrypt.compare(password, employee.password);
    if (!valid) {
        return null;
    }
    const token = jwt.sign({ email: employee.email, role: employee.role } as JwtPayload, env.JWT_SECRET, { expiresIn: '1w' });
    return { token, employee };
}

export const getAllEmployees = async () => {
    const employees = await EmployeeModal.getAllEmployees();
    return employees;
}
export const getEmployeeById = async (id: number) => {
    const employee = await EmployeeModal.getEmployeeById(id);

    return employee;
}
export const updateEmployee = async ({ id, name, number, role }: EmployeeInput) => {
    const employee = await EmployeeModal.updateEmployee({ id, name, number, role });
    return employee;
}

export const deleteEmployee = async (id: number) => {
    const employee = await EmployeeModal.deleteEmployee(id);

    return employee;
}