import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true },
  phone: { type: String, trim: true, maxlength: 20 },
  role: { type: String, enum: ["donor", "ngo", "admin"], default: "donor", index: true },
  address: {
    line1: String, city: String, state: String, pincode: String
  },
  organizationName: { type: String, trim: true, maxlength: 120 },
  description: { type: String, maxlength: 500 },
  verified: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
