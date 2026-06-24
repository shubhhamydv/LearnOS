import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["student", "educator"], required: true },
    photoUrl: { type: String, default: "" },
    enrollCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    enrolledCourses: [ // FIXED: orderController enrolledCourses use karta hai, field missing thi
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    resetOtp: {
      type: String
    },
    otpExpires : {
      type: Date
    },
    isOtpVerified: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;