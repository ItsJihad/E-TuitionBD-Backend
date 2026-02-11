import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import Stripe from "stripe"
import asyncHandler from "../utils/AsyncHandler.js"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const DOMAIN=process.env.CORS_ORIGIN

export const StripePayment = asyncHandler(async (req, res) => {
    const { cost, name, productId, customer_email } = req.body

    const amount = Math.round(Number(cost) * 100)

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid payment amount" })
    }

    const session = await stripe.checkout.sessions.create({
    
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: name,
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        metadata: {
            productId: productId,
        },
        customer_email: customer_email,
        success_url: `${DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/dashboard/payment-cancelled`,
    })

    return res.status(200).json({ url: session.url })
})


// THIS PART IS CONFUSING < I NEED TO RECAP IT LATER