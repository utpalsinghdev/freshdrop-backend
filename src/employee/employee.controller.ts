import * as employeeService from './employee.services';
import { Request, Response } from 'express';

import { EmployeeInput } from './employee.model';
import { employeeSchema, loginSchema } from './employee.schema';

export const CreateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = employeeSchema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        } else {
            const { email, password, name, number, role } = req.body;
            const employee = await employeeService.getEmployeee(email);
            if (employee) {
                res.status(409).json({
                    message: "Employee already exists"
                });
            } else {
                const newEmployee = await employeeService.CreateUser({ email, password, name, number, role });
                res.status(201).json({
                    message: "Employee created successfully",
                    employee: newEmployee
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const loginEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        } else {
            const { email, password } = req.body;
            const data = await employeeService.loginEmployee(email, password);
            if (data) {
                res.status(200).json({
                    message: "Employee logged in successfully",
                    data,
                });
            } else {
                res.status(401).json({
                    message: "Invalid credentials"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
