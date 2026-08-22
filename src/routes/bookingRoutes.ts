import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import {
  createBooking,
  cancelBooking,
  getMyBookings,
  getSessionBookings,
} from "../controllers/bookingController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: API endpoints for managing session bookings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - sessionId
 *         - memberId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the booking
 *         sessionId:
 *           type: string
 *           description: The ID of the session being booked
 *         memberId:
 *           type: string
 *           description: The ID of the member who made the booking
 *         status:
 *           type: string
 *           description: The current status of the booking (e.g., active, cancelled)
 *       example:
 *         _id: 64b9f0f9a4c8a2b3e4d5e6f7
 *         sessionId: 64b9f0f9a4c8a2b3e4d5e6f8
 *         memberId: 64b9f0f9a4c8a2b3e4d5e6f9
 *         status: active
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: 
 *       - Bookings
 *     summary: Create a new booking (Member only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: The ID of the session to book
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized (Token missing or invalid)
 *       403:
 *         description: Forbidden (Requires Member role)
 *       500:
 *         description: Some server error!
 */
router.post("/", protect, restrictTo("Member"), createBooking);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     tags: 
 *       - Bookings
 *     summary: Cancel an existing booking (Member only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the booking to cancel
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Requires Member role)
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Some server error!
 */
router.patch("/:id/cancel", protect, restrictTo("Member"), cancelBooking);

/**
 * @swagger
 * /api/bookings/my-bookings:
 *   get:
 *     tags: 
 *       - Bookings
 *     summary: Retrieve a list of all bookings for the logged-in member
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the member's bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Requires Member role)
 *       500:
 *         description: Some server error!
 */
router.get("/my-bookings", protect, restrictTo("Member"), getMyBookings);

/**
 * @swagger
 * /api/bookings/session/{sessionId}:
 *   get:
 *     tags: 
 *       - Bookings
 *     summary: Retrieve all bookings for a specific session (Trainer only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the session
 *     responses:
 *       200:
 *         description: A list of bookings for the requested session
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Requires Trainer role)
 *       404:
 *         description: Session not found
 *       500:
 *         description: Some server error!
 */
router.get("/session/:sessionId", protect, restrictTo("Trainer"), getSessionBookings);

export default router;