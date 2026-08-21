import { Router } from "express"
import { createClass , updateClass , deleteClass , getClasses } from "../controllers/class.controller"

const router = Router()

router.get("/gym" , getClasses)
router.post("/gym" , createClass)
router.put("/gym/:id" , updateClass)
router.delete("/gym/:id" , deleteClass)

export default router
