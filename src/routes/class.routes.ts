import { Router } from "express"
import { protect, restrictTo } from "../middlewares/auth.js";
import { createClass , updateClass , deleteClass , getClasses , getClassById } from "../controllers/class.controller.js"
import { validateCreateClass , validateUpdateClass } from "../middlewares/class.validation.js"

const router = Router()

router.get("/" , protect , restrictTo("Trainer"), getClasses)
router.get("/:id" , protect , restrictTo("Trainer") , getClassById)
router.post("/" , protect , restrictTo("Trainer") , validateCreateClass , createClass)
router.patch("/:id" , protect , restrictTo("Trainer") , validateUpdateClass , updateClass)
router.delete("/:id" , protect , restrictTo("Trainer") , deleteClass)

export default router
