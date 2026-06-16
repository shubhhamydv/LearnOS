import jwt from "jsonwebtoken";

const genToken = (userId) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
          console.log("Token =", token);
        return token;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export default genToken;