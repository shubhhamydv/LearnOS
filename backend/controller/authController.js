import User from "../model/UserModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: "User is already exist" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "enter valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Enter strong password" });
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        let token = genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: `signUp error ${error.message}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        let token = genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: `login error ${error.message}` });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `Logout error ${error.message}`
        });
    }
};