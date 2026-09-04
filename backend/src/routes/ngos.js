import { Router } from "express";
import User from "../models/User.js";
import { auth, roles } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { search = "", city = "" } = req.query;
    const query = { role: "ngo", verified: true };
    if (search) query.$or = [
      { organizationName: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
    if (city) query["address.city"] = { $regex: city, $options: "i" };

    const ngos = await User.find(query)
      .select("name organizationName description phone address verified createdAt")
      .sort({ organizationName: 1 }).limit(50);
    res.json({ ngos });
  } catch (e) { next(e); }
});

router.get("/all", auth, roles("admin"), async (req, res, next) => {
  try {
    const ngos = await User.find({ role: "ngo" }).select("-password").sort({ createdAt: -1 });
    res.json({ ngos });
  } catch (e) { next(e); }
});

router.patch("/:id/verify", auth, roles("admin"), async (req, res, next) => {
  try {
    const ngo = await User.findOneAndUpdate(
      { _id: req.params.id, role: "ngo" },
      { verified: Boolean(req.body.verified) },
      { new: true }
    ).select("-password");
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.json({ ngo });
  } catch (e) { next(e); }
});

export default router;
