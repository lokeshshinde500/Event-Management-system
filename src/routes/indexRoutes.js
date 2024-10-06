import { Router } from "express";
import authRoutes from "./authRoutes.js";
import eventRoutes from "./eventRoutes.js";
import { authenticate } from "../middleware/authenticate.js";
const routes = Router();

// auth routes
routes.use("/auth", authRoutes);

// event routes
routes.use("/event", authenticate, eventRoutes);

export default routes;
