import mongoose, {Schema} from "mongoose";

export interface ClassSession{
  title: string;
  trainer: mongoose.Types.ObjectId; // gives each trainee a unique id
  timeSlot: Date;
  capacity: number;
}

const classSessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    trainer: {
      type: Schema.Types.ObjectId,
      ref: "User", // takes the id from the users where he is already have his id so the user dont have to write the id when
                    // he creates a session
      required: true,
    },

    timeSlot: {
      type: Date,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
  }
);

export const ClassSession = mongoose.model("ClassSession",classSessionSchema);