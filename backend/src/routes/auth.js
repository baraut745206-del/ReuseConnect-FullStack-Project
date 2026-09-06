import { Router } from "express";
import User from "../models/User.js";
import { hashPassword, comparePassword, signToken } from "../utils/auth.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, phone, role = "donor", organizationName, description, address } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
    if (!["donor", "ngo"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email is already registered" });

    const user = await User.create({
      name, email, password: await hashPassword(password), phone, role,
      organizationName, description, address,
      verified: role === "donor"
    });

    res.status(201).json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, verified: user.verified }
    });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    console.log("LOGIN CHECK:", email?.toLowerCase());
console.log("USER FOUND:", !!user, "ROLE:", user?.role);
    if (!user || !(await comparePassword(password || "", user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, verified: user.verified }
    });
  } catch (e) { next(e); }
});

router.get("/me", auth, async (req, res) => res.json({ user: req.user }));

export default router;
