import mongoose, { Schema } from "mongoose";

export interface Booking {
  session: mongoose.Types.ObjectId;
  member: mongoose.Types.ObjectId;
  status: "booked" | "cancelled";
}

const bookingSchema = new Schema(
  {
    session: {
      type: Schema.Types.ObjectId,
      ref: "ClassSession",
      required: true,
    },

    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

bookingSchema.index(
  { session: 1, member: 1 },
  { unique: true, partialFilterExpression: { status: "booked" } }
);

export const Booking = mongoose.model("Booking", bookingSchema);