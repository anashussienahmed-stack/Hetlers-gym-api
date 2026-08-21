import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import {
  createBooking,
  cancelBooking,
  getMyBookings,
  getSessionBookings,
} from "../controllers/bookingController.js";

const router = Router();

router.post("/", protect, restrictTo("Member"), createBooking);
router.patch("/:id/cancel", protect, restrictTo("Member"), cancelBooking);
router.get("/my-bookings", protect, restrictTo("Member"), getMyBookings);
router.get("/session/:sessionId", protect, restrictTo("Trainer"), getSessionBookings);

export default router;