import { Router } from "express"
import { CreateEmployee, loginEmployee } from "./employee.controller";
import { verifyToken } from "./employe.utils";
const router = Router();


router.post('/create', verifyToken, CreateEmployee)
router.post('/login', loginEmployee)
export default router;