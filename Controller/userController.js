import {User} from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const secretKey = "HALA MADRID";
//gets the user type users
export const getUsers = async (req, res) => {
    const users = await User.find({type: "user"});
    return res.json(users);
};

//gets users with coach, nutritionist, and therapist type
export const getExperts = async (req, res) => {
    const users = await User.find({$or: [{type: "coach"}, {type: "nutritionist"}, {type: "therapist"}]});
    return res.json(users);
};

//allows the user to signin to the website
export const Signin = async (req, res) => {
    const {email, password, type} = req.body;
    console.log(req.body);
    const user = await User.findOne({email: email});
    console.log(user);
    if (!user) {
        return res.status(400).json({message: `user does not exist `});
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.error("Error comparing passwords:", err);
            return;
        }
        if (result) {
            const token = jwt.sign({id: user._id, type}, secretKey);
            res.status(200).json({
                message: "User indeed exists.",
                token,
            });
        } else {
            res.status(400).json({
                message: "error with authenticating.",
            });
        }
    });
};

//creates a user and saves its image using the multer library
export const createUser = async (req, res) => {
    const {name, email, password, type} = req.body;
    const diseases = JSON.parse(req.body.diseases);
    if (!name || !email || !password || !type || !diseases) {
        return res.status(400).json({message: "All fields are required."});
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({message: "Email already registered."});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        banned: false,
        type,
        filename: req.file.filename,
        diseases,
    });

    await newUser.save();
    return res.status(200).json(newUser);
};

export const banUser = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    console.log(user);
    res.json({message: "response recieved"});
};
