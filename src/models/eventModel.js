import mongoose from "mongoose";
import multer from "multer";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    maxAttendees: {
      type: Number,
      required: true,
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const storage = multer.diskStorage({});
export const upload = multer({ storage: storage }).single("image");

const eventModel = mongoose.model("event", eventSchema);
export default eventModel;

