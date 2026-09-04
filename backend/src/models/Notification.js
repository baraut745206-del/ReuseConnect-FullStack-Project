import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: String,
  message: String,
  type: { type: String, enum: ["donation", "account", "system"], default: "system" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);
