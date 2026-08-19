import { Router } from "express";
import {signin,signup} from "../controllers/authController"


const router = Router()


router.post("/signup",signup)
router.post("/signin",signin)




export default router // we can import this router without{} and with anyname