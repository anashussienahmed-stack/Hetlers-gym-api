import { Router } from "express";
import {signin,signup} from "../controllers/authController.js"
import validatSignup from "../middlewares/validateSignup.js"

const router = Router()


router.post("/signup",validatSignup,signup)
router.post("/signin",signin)




export default router // we can import this router without{} and with anyname