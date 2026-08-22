import { Router } from "express";
import {signin,signup} from "../controllers/authController.js"
import validatSignup from "../middlewares/validateSignup.js"

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication (Register and Login)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *       properties:
 *         fullname:
 *           type: string
 *           description: Full name of the user
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Strong password
 *           example: "Password123!"
 *         role:
 *           type: string
 *           enum: [Member, Trainer]
 *           default: Member
 *           description: Role of the user
 *           example: "Member"
 *
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "Password123!"
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: 
 *       - Auth
 *     summary: Register a new user (Member or Trainer)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 *       500:
 *         description: Server error
 */
router.post("/signup", validatSignup, signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: 
 *       - Auth
 *     summary: Login into the system and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Successful login and returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post("/signin", signin);

export default router;