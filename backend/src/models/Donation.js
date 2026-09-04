import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  itemType: { type: String, enum: ["Clothes", "Household Items", "Books", "Toys", "Other"], required: true, index: true },
  itemName: { type: String, required: true, trim: true, maxlength: 120 },
  quantity: { type: Number, required: true, min: 1, max: 10000 },
  condition: { type: String, enum: ["New", "Like New", "Good", "Usable"], required: true },
  description: { type: String, maxlength: 500 },
  pickupAddress: {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    pincode: String
  },
  scheduledAt: { type: Date, required: true, index: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Scheduled", "Picked Up", "Distributed", "Rejected", "Cancelled"],
    default: "Pending",
    index: true
  },
  donorNote: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

donationSchema.index({ status: 1, scheduledAt: -1 });
donationSchema.index({ itemType: 1, "pickupAddress.city": 1 });

export default mongoose.model("Donation", donationSchema);
