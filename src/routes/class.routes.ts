import { Router } from "express"
import { protect, restrictTo } from "../middlewares/auth.js";
import { createClass , updateClass , deleteClass , getClasses , getClassById } from "../controllers/class.controller.js"
import { validateCreateClass , validateUpdateClass } from "../middlewares/class.validation.js"

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ClassSession:
 *       type: object
 *       required:
 *         - title
 *         - timeSlot
 *         - capacity
 *       properties:
 *         title:
 *           type: string
 *           description: اسم الحصة
 *           example: "Yoga for Beginners"
 *         timeSlot:
 *           type: string
 *           format: date-time
 *           description: موعد الحصة (يجب أن يكون في المستقبل)
 *           example: "2026-09-01T10:00:00Z"
 *         capacity:
 *           type: integer
 *           description: أقصى عدد للمشتركين (رقم موجب)
 *           example: 20
 */
/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Show all sessions (Search & filter)
 *     tags: [Class Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by title like (yoga)
 *       - in: query
 *         name: trainer
 *         schema:
 *           type: string
 *         required: false
 *         description: search by trainer name like(Anas)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: filtering by date like (2027-09-01)
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         required: false
 *         description: filtering by available sessions 
 *     responses:
 *       200:
 *         description: تم جلب الحصص بنجاح
 *       500:
 *         description: خطأ في الخادم
 *
 *   post:
 *     summary: إنشاء حصة جديدة (للمدرب فقط)
 *     tags: [Class Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassSession'
 *     responses:
 *       201:
 *         description: تم إنشاء الحصة بنجاح
 */
router.get("/", protect, restrictTo("Member"), getClasses);
router.post("/", protect, restrictTo("Trainer"), validateCreateClass, createClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: عرض تفاصيل حصة معينة بالـ ID
 *     tags: [Class Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID الخاص بالحصة
 *     responses:
 *       200:
 *         description: تفاصيل الحصة
 * 
 *   patch:
 *     summary: تعديل بيانات حصة (المدرب يعدل حصصه فقط)
 *     tags: [Class Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID الخاص بالحصة
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassSession'
 *     responses:
 *       200:
 *         description: تم التعديل بنجاح
 * 
 *   delete:
 *     summary: حذف حصة 
 *     tags: [Class Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID الخاص بالحصة
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 */
router.get("/:id", protect, restrictTo("Member"), getClassById);
router.patch("/:id", protect, restrictTo("Trainer"), validateUpdateClass, updateClass);
router.delete("/:id", protect, restrictTo("Trainer"), deleteClass);

export default router;