import {verify} from "jsonwebtoken";
import {secretKey} from "../Controller/userController";

const adminMiddleWare = (req, res, next) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "token was not provided"});
    }
    try {
        const decode = verify(token, secretKey);
        if ((decode.type = "admin")) {
            next();
        } else {
            return res.status(400).json({message: "unAutharized"});
        }
    } catch (error) {
        return res.status(400).json({message: "Invalid token ", error});
    }
};
