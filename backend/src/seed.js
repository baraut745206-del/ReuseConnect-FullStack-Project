import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Donation from "./models/Donation.js";
import { hashPassword } from "./utils/auth.js";

await connectDB();

await Donation.deleteMany({});
await User.deleteMany({});

const [admin, ngo, donor] = await User.create([
  {
    name: "ReuseConnect Admin", email: "admin@reuseconnect.local",
    password: await hashPassword("Admin@123"), role: "admin", verified: true
  },
  {
    name: "Asha Foundation", email: "ngo@reuseconnect.local",
    password: await hashPassword("Ngo@123"), role: "ngo", verified: true,
    organizationName: "Asha Foundation", description: "Verified community NGO supporting families with reusable essentials.",
    phone: "9876543210", address: { line1: "12 Community Road", city: "Delhi", state: "Delhi", pincode: "110001" }
  },
  {
    name: "Demo Donor", email: "donor@reuseconnect.local",
    password: await hashPassword("Donor@123"), role: "donor", verified: true,
    phone: "9876500000", address: { line1: "21 Green Street", city: "Delhi", state: "Delhi", pincode: "110002" }
  }
]);

await User.create({
  name: "Helping Hands NGO", email: "pending@reuseconnect.local",
  password: await hashPassword("Ngo@123"), role: "ngo", verified: false,
  organizationName: "Helping Hands NGO", description: "Pending verification demo organization.",
  address: { line1: "7 Service Lane", city: "Gurugram", state: "Haryana", pincode: "122001" }
});

await Donation.create({
  donor: donor._id, ngo: ngo._id, itemType: "Clothes", itemName: "Winter Clothes",
  quantity: 8, condition: "Good", description: "Clean jackets and sweaters.",
  pickupAddress: donor.address, scheduledAt: new Date(Date.now() + 48*60*60*1000), status: "Scheduled"
});

console.log("Seed complete.");
await mongoose.connection.close();
