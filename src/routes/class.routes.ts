import { Router } from "express"
import { createClass , updateClass , deleteClass , getClasses , getClassById } from "../controllers/class.controller"
import { validateCreateClass , validateUpdateClass } from "../middlewares/class.validation"

const router = Router()

router.get("/" , getClasses)
router.get("/:id" , getClassById)
router.post("/" , validateCreateClass , createClass)
router.patch("/:id" , validateUpdateClass , updateClass)
router.delete("/:id" , deleteClass)

export default router
