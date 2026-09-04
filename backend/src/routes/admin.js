import { Router } from "express";
import User from "../models/User.js";
import Donation from "../models/Donation.js";
import { auth, roles } from "../middleware/auth.js";

const router = Router();
router.use(auth, roles("admin"));

router.get("/stats", async (req, res, next) => {
  try {
    const [donors, ngos, donations, completed, quantity] = await Promise.all([
      User.countDocuments({ role: "donor" }),
      User.countDocuments({ role: "ngo", verified: true }),
      Donation.countDocuments(),
      Donation.countDocuments({ status: { $in: ["Picked Up", "Distributed"] } }),
      Donation.aggregate([{ $group: { _id: null, value: { $sum: "$quantity" } } }])
    ]);
    res.json({ donors, ngos, donations, completed, quantity: quantity[0]?.value || 0 });
  } catch (e) { next(e); }
});

export default router;
