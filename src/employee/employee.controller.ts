import * as employeeService from './employee.services';
import { Request, Response } from 'express';
import * as userServices from '../User/user.services'
import { EmployeeInput } from './employee.model';
import { employeeSchema, loginSchema, updateemployeeSchema } from './employee.schema';
import { EmployeeRole } from '@prisma/client';

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

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({
            message: "Employees fetched successfully",
            employees
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (!id) throw new Error("Invalid id missing");
        const employee = await employeeService.getEmployeeById(id);
        if (employee) {
            res.status(200).json({
                message: "Employee fetched successfully",
                employee
            });
        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = updateemployeeSchema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        } else {
            const id = parseInt(req.params.id);

            const { email, name, number, role } = req.body;
            if (!id) throw new Error("Invalid id missing");

            const employee = await employeeService.getEmployeeById(id);
            if (employee) {
                const updatedEmployee = await employeeService.updateEmployee({ id, email, name, number, role });
                res.status(200).json({
                    message: "Employee updated successfully",
                    employee: updatedEmployee
                });
            } else {
                res.status(404).json({
                    message: "Employee not found"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
interface AuthenticatedRequest extends Request {
    email: string;
    role: EmployeeRole;
}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const role = (req as AuthenticatedRequest).role;
        if (!id) {
            res.status(400).json({
                message: "Invalid id missing"
            });
        }
        const employee = await employeeService.getEmployeeById(id);
        if (employee) {
            if (role !== EmployeeRole.SUPERADMIN) {
                if (employee.role === EmployeeRole.ADMIN && employee.Employee_id === id || employee.role === EmployeeRole.SUPERADMIN) {
                    throw new Error("Admin can't be deleted");
                } else {
                    const deletedEmployee = await employeeService.deleteEmployee(id);
                    res.status(200).json({
                        message: "Employee deleted successfully",
                        employee: deletedEmployee
                    });
                }
            } else {
                const deletedEmployee = await employeeService.deleteEmployee(id);
                res.status(200).json({
                    message: "Employee deleted successfully",
                    employee: deletedEmployee
                });
            }

        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (!id) throw new Error("Invalid id missing");
        const user = await userServices.getUserById(id);
        if (user) {
            res.status(200).json({
                message: "User fetched successfully",
                user
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (!id) throw new Error("Invalid id missing");
        const user = await userServices.getUserById(id);
        if (user) {
            const deletedUser = await userServices.deleteUser(id);
            res.status(200).json({
                message: "User deleted successfully",
                user: deletedUser
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {

        const { number } = req.body;
        const user = await userServices.GetUser(number);
        if (user) {
            res.status(400).json({
                message: "User already exists",
            });
        } else {
            const user = await userServices.CreateUser(number);

            res.status(200).json({
                message: "User created successfully",
                user
            });

        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
