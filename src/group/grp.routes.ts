import { Router } from "express"
import { AddSingleUserToGroup, AllGroupsController, CreateGroupController, addManyUsersToGroup, deleteGroup, getSingleGroupController } from "./grp.controller";
import { AdminVerifyToken, verifyToken } from "../employee/employe.utils";
const router = Router();

// Routes for Admin
router.post("/create", AdminVerifyToken, CreateGroupController)
router.delete("/delete/:id", AdminVerifyToken, deleteGroup)


// Routes for Admin and Employee
router.get("/all", verifyToken, AllGroupsController)
router.get("/:id", verifyToken, getSingleGroupController)
router.post("/add-user", verifyToken, AddSingleUserToGroup)
router.post("/add-many", verifyToken, addManyUsersToGroup)
export default router;