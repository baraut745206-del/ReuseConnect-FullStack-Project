import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import ngoRoutes from "./routes/ngos.js";
import donationRoutes from "./routes/donations.js";
import notificationRoutes from "./routes/notifications.js";
import adminRoutes from "./routes/admin.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || true }));
app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true }));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "ReuseConnect API" }));
app.use("/api/auth", authRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch(err => { console.error(err); process.exit(1); });
