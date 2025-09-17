import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get('/:id',userController.getUserById);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
export default router;
