import { Router } from "express";
import Donation from "../models/Donation.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { auth, roles } from "../middleware/auth.js";

const router = Router();

async function notify(userId, title, message) {
  await Notification.create({ user: userId, title, message, type: "donation" });
}

router.post("/", auth, roles("donor"), async (req, res, next) => {
  try {
    const { ngo, itemType, itemName, quantity, condition, description, pickupAddress, scheduledAt, donorNote } = req.body;
    if (!ngo || !itemType || !itemName || !quantity || !condition || !pickupAddress?.line1 || !pickupAddress?.city || !scheduledAt) {
      return res.status(400).json({ message: "Please fill all required donation fields" });
    }
    const ngoUser = await User.findOne({ _id: ngo, role: "ngo", verified: true });
    if (!ngoUser) return res.status(400).json({ message: "Please select a verified NGO" });

    const date = new Date(scheduledAt);
    if (Number.isNaN(date.getTime()) || date <= new Date()) {
      return res.status(400).json({ message: "Pickup time must be a valid future date" });
    }

    const donation = await Donation.create({
      donor: req.user._id, ngo, itemType, itemName, quantity, condition,
      description, pickupAddress, scheduledAt: date, donorNote
    });

    await notify(ngo, "New collection request", `${req.user.name} submitted a ${itemType} donation request.`);
    const full = await Donation.findById(donation._id).populate("ngo", "name organizationName").populate("donor", "name email");
    res.status(201).json({ donation: full });
  } catch (e) { next(e); }
});

router.get("/mine", auth, roles("donor"), async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate("ngo", "name organizationName")
      .sort({ createdAt: -1 }).limit(100).lean();
    res.json({ donations });
  } catch (e) { next(e); }
});

router.get("/ngo", auth, roles("ngo"), async (req, res, next) => {
  try {
    const donations = await Donation.find({ ngo: req.user._id })
      .populate("donor", "name email phone")
      .sort({ scheduledAt: 1 }).limit(100).lean();
    res.json({ donations });
  } catch (e) { next(e); }
});

router.get("/all", auth, roles("admin"), async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    const [donations, total] = await Promise.all([
      Donation.find().populate("donor", "name email").populate("ngo", "name organizationName")
        .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Donation.countDocuments()
    ]);
    res.json({ donations, total, page, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
});

router.patch("/:id/status", auth, async (req, res, next) => {
  try {
    const allowed = ["Accepted", "Scheduled", "Picked Up", "Distributed", "Rejected", "Cancelled", "Pending"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status" });

    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    const isDonor = donation.donor.toString() === req.user._id.toString();
    const isNgo = donation.ngo.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isDonor && !isNgo && !isAdmin) return res.status(403).json({ message: "Not allowed" });

    donation.status = req.body.status;
    await donation.save();

    const recipient = isNgo ? donation.donor : donation.ngo;
    await notify(recipient, "Donation status updated", `Donation ${donation.itemName} is now ${donation.status}.`);

    const full = await Donation.findById(donation._id).populate("donor", "name email").populate("ngo", "name organizationName");
    res.json({ donation: full });
  } catch (e) { next(e); }
});

router.get("/stats", auth, async (req, res, next) => {
  try {
    const filter = req.user.role === "donor" ? { donor: req.user._id }
      : req.user.role === "ngo" ? { ngo: req.user._id } : {};

    const [total, completed, pending, quantity] = await Promise.all([
      Donation.countDocuments(filter),
      Donation.countDocuments({ ...filter, status: { $in: ["Picked Up", "Distributed"] } }),
      Donation.countDocuments({ ...filter, status: { $in: ["Pending", "Accepted", "Scheduled"] } }),
      Donation.aggregate([
        { $match: filter },
        { $group: { _id: null, value: { $sum: "$quantity" } } }
      ])
    ]);
    res.json({ total, completed, pending, quantity: quantity[0]?.value || 0 });
  } catch (e) { next(e); }
});

export default router;
