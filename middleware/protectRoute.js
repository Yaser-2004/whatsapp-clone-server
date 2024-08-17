import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function protectRoute(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({error: "Unauthorised - no token provided"});
        }

        const decoded = jwt.verify(token, "TOPSECRETWORD");

        if (!decoded) {
            return res.status(401).json({error: "Unauthorised - Invalid Token"});
        }

        const user = await userModel.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({error: "User Not Found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
    }
}

export default protectRoute;