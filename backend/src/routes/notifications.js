import { Router } from "express";
import Notification from "../models/Notification.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 }).limit(30).lean();
    res.json({ notifications });
  } catch (e) { next(e); }
});

router.patch("/:id/read", auth, async (req, res, next) => {
  try {
    await Notification.updateOne({ _id: req.params.id, user: req.user._id }, { read: true });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
