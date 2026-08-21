import { Router } from "express";
import { signin, signup } from "../controllers/authController";
import validatSignup from "../middlewares/validateSignup";
const router = Router();
router.post("/signup", validatSignup, signup);
router.post("/signin", signin);
export default router; // we can import this router without{} and with anyname
