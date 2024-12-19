import {verify} from "jsonwebtoken";

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
