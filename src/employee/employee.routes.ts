import { Router } from "express"
import {
    CreateEmployee,
    createUser,
    deleteEmployee,
    deleteUser,
    getAllEmployees,
    getAllUsers,
    getEmployeeById,
    getUserById,
    loginEmployee,
    updateEmployee
} from "./employee.controller";
import { AdminVerifyToken, verifyToken } from "./employe.utils";
const router = Router();

// Routes for Admin only
router.post('/create', AdminVerifyToken, CreateEmployee)
router.get('/all', AdminVerifyToken, getAllEmployees)
router.put('/update/:id', AdminVerifyToken, updateEmployee)
router.get('/:id', AdminVerifyToken, getEmployeeById)
router.delete('/:id', AdminVerifyToken, deleteEmployee)
router.delete('/user/:id', AdminVerifyToken, deleteUser)
router.post('/user/add', AdminVerifyToken, createUser)


// Routes for all deliveryBoy and admin
router.post('/login', loginEmployee)
router.get('/all/users', verifyToken, getAllUsers)
router.get('/all/user/:id', verifyToken, getUserById)




export default router;
