import { Router } from "express"
import { CreateEmployee, deleteEmployee, getAllEmployees, getEmployeeById, loginEmployee, updateEmployee } from "./employee.controller";
import { AdminVerifyToken } from "./employe.utils";
const router = Router();

// Routes for Admin only
router.post('/create', AdminVerifyToken, CreateEmployee)
router.get('/all', AdminVerifyToken, getAllEmployees)
router.put('/update/:id', AdminVerifyToken, updateEmployee)
router.get('/:id', AdminVerifyToken, getEmployeeById)
router.delete('/:id', AdminVerifyToken, deleteEmployee)


// Routes for all employees and admin
router.post('/login', loginEmployee)
export default router;