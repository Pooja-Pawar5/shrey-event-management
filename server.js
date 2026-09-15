const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
app.post("/create-order", async (req, res) => {

    try {

        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                error: "Amount is required"
            });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "shrey_" + Date.now()
        };

        const order =
            await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to create payment order"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});