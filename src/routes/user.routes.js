import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("all", userController.getAllUsers);
router.post("/", userController.createUser);
export default router;
