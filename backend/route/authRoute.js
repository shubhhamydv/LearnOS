import express from "express";
import { signUp, login, logOut, sentOTP,verifyOTP, resetPassword } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/sendotp", sentOTP);
authRouter.post("/verifyotp", verifyOTP);
authRouter.post("/resetpassword", resetPassword);

export default authRouter;