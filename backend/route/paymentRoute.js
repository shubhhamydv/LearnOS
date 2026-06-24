import express from 'express'
import { RazorPayOrder, verifyPayment } from '../controller/orderController.js' // FIXED: .js extension add kiya — ESM me required hai

const paymentRouter = express.Router()

paymentRouter.post("/razorpay-order", RazorPayOrder)
paymentRouter.post("/verifypayment", verifyPayment) // FIXED: missing leading slash add kiya

export default paymentRouter