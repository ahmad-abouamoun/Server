import {verify} from "jsonwebtoken";
import {secretKey} from "../Controller/userController";

const adminMiddleWare = (req, res, next) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }
    try {
        const decode = verify(token, secretKey);
    } catch {
        return res.status(400).json({message: "Invalid token"});
    }
};
