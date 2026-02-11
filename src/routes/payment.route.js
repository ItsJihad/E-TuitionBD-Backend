import { Router } from "express";
import { StripePayment } from "../middlewares/Stripe.Payment.js";

export const router =Router()
router.route("/checkout").post(StripePayment)