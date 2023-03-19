import { Router } from "express"
import { CreateEmployee, loginEmployee } from "./employee.controller";
const router = Router();


router.post('/create', CreateEmployee)
router.post('/login', loginEmployee)
export default router;