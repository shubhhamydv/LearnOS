import Razorpay from "razorpay"
import dotenv from "dotenv"
import Course from "../model/courseModel.js"
import User from "../model/userModel.js"   // FIXED: User model import
import crypto from "crypto"               // FIXED: payment verification ke liye

dotenv.config()

// FIXED: Razorpay instance
const RazorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


// Create Order
export const RazorPayOrder = async (req, res) => {
    try {

        const { courseId } = req.body

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        const options = {
            amount: course.price * 100, // FIXED: paisa → paise
            currency: "INR",

            // FIXED: receipt syntax
            receipt: courseId.toString()
        }

        const order = await RazorPayInstance.orders.create(options)

        return res.status(200).json(order)

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: "Failed to create Razorpay Order"
        })
    }
}



// Verify Payment
export const verifyPayment = async (req, res) => {
    try {

        const {
            courseId,
            userId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body


        // FIXED: payment signature verify
        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body.toString())
            .digest("hex")


        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment failed"
            })
        }


        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // FIXED: enroll course in user
        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId)
            await user.save()
        }


        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        // FIXED: add student in course
        if (!course.enrolledStudents.includes(userId)) {
            course.enrolledStudents.push(userId)
            await course.save()
        }


        return res.status(200).json({
            message: "Payment verified and enrollment successful"
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: `Internal server error during payment verification ${error}`
        })
    }
}