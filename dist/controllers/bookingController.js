import { Booking } from "../models/Booking.js";
import { ClassSession } from "../models/ClassSession.js";
//////////////////////////////////////////////////////////////
// POST /api/bookings   (Member only)
//////////////////////////////////////////////////////////////
export const createBooking = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({ msg: "sessionId is required" });
        }
        const classSession = await ClassSession.findById(sessionId);
        if (!classSession) {
            return res.status(404).json({ msg: "Class session not found" });
        }
        if (new Date(classSession.timeSlot) <= new Date()) {
            return res.status(400).json({ msg: "Cannot book a session in the past" });
        }
        const alreadyBooked = await Booking.findOne({
            session: sessionId,
            member: req.user.id,
            status: "booked",
        });
        if (alreadyBooked) {
            return res.status(400).json({ msg: "You already booked this session" });
        }
        const activeBookingsCount = await Booking.countDocuments({
            session: sessionId,
            status: "booked",
        });
        if (activeBookingsCount >= classSession.capacity) {
            return res.status(400).json({ msg: "This class is full" });
        }
        const booking = await Booking.create({
            session: sessionId,
            member: req.user.id,
            status: "booked",
        });
        return res.status(201).json({ msg: "Booked successfully", booking });
    }
    catch (err) {
        if (err?.code === 11000) {
            return res.status(400).json({ msg: "You already booked this session" });
        }
        console.log("createBooking err", err);
        return res.status(500).json({ msg: "Server error" });
    }
};
//////////////////////////////////////////////////////////////
// PATCH /api/bookings/:id/cancel   (Member only - صاحب الحجز بس)
//////////////////////////////////////////////////////////////
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }
        if (booking.member.toString() !== req.user.id) {
            return res.status(403).json({ msg: "You can only cancel your own bookings" });
        }
        if (booking.status === "cancelled") {
            return res.status(400).json({ msg: "This booking is already cancelled" });
        }
        booking.status = "cancelled";
        await booking.save();
        return res.status(200).json({ msg: "Booking cancelled successfully", booking });
    }
    catch (err) {
        console.log("cancelBooking err", err);
        return res.status(500).json({ msg: "Server error" });
    }
};
//////////////////////////////////////////////////////////////
// GET /api/bookings/my-bookings   (Member only)
//////////////////////////////////////////////////////////////
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ member: req.user.id })
            .populate("session", "title timeSlot capacity")
            .sort({ createdAt: -1 });
        return res.status(200).json({ bookings });
    }
    catch (err) {
        console.log("getMyBookings err", err);
        return res.status(500).json({ msg: "Server error" });
    }
};
//////////////////////////////////////////////////////////////
// GET /api/bookings/session/:sessionId   (Trainer only - صاحب الحصة بس)
//////////////////////////////////////////////////////////////
export const getSessionBookings = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const classSession = await ClassSession.findById(sessionId);
        if (!classSession) {
            return res.status(404).json({ msg: "Class session not found" });
        }
        if (classSession.trainer.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ msg: "You can only view bookings for your own sessions" });
        }
        const bookings = await Booking.find({
            session: sessionId,
            status: "booked",
        }).populate("member", "fullname email");
        return res.status(200).json({ bookings });
    }
    catch (err) {
        console.log("getSessionBookings err", err);
        return res.status(500).json({ msg: "Server error" });
    }
};
