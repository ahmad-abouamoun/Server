import {User} from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, {Mongoose} from "mongoose";
import {Food} from "../Models/food.js";
import {Program} from "../Models/programs.js";

export const secretKey = "HALA MADRID";

//gets the user type users
export const getUsers = async (req, res) => {
    const users = await User.find({type: "user"}).select("name email banned");
    return res.json(users);
};

//gets users with coach,or nutritionist, or therapist type
export const getExperts = async (req, res) => {
    const users = await User.find({$or: [{type: "coach"}, {type: "nutritionist"}, {type: "therapist"}]}).select(
        "name email banned type"
    );
    return res.json(users);
};

//allows the user to signin to the website
export const Signin = async (req, res) => {
    const {email, password, type} = req.body;
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({message: `user does not exist `});
        }
        if (user.banned) {
            return res.status(400).json({message: "user has been banned"});
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
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
    } catch {
        res.status(500).json({
            message: "error occured with the Db.",
        });
    }
};

//creates a user and saves its image using the multer library
export const createUser = async (req, res) => {
    const {name, email, password, type} = req.body;

    const diseases = JSON.parse(req.body.diseases);
    if (!name || !email || !password || !type || !diseases) {
        return res.status(400).json({message: "All fields are required."});
    }
    try {
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
        return res.status(200).json();
    } catch {
        res.status(400).json({
            message: "error occured with the Db.",
        });
    }
};

//bans the user according to the id
export const banUser = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
        });
    }
    user.banned = true;
    await user.save();
    return res.status(200).json(user);
};

//updates the user's info
export const updateUser = async (req, res) => {
    const {name, diseases, token} = req.body;
    try {
        const decode = jwt.verify(token, secretKey);
        id = decode.id;
    } catch (error) {
        return res.status(401).json({message: "Invalid or expired token"});
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                diseases,
            },
            {new: true}
        );
        if (!updatedUser) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        await updatedUser.save();
        return res.status(200).json({message: "user was updated"});
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const addFavProgram = async (req, res) => {
    const {id} = req.params;
    const {programId} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(programId)) {
        return res.status(400).json({message: "id or program id is not of type obj id"});
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        if (user.favPrograms.includes(programId)) {
            return res.status(400).json({message: "program already favorited"});
        }
        user.favPrograms.push(new mongoose.Types.ObjectId(programId));
        const updateProgram = await Program.findByIdAndUpdate(
            programId,
            {
                isBookmarked: true,
            },
            {new: true}
        );

        await updateProgram.save();
        await user.save();
        return res.status(200).json({message: "user favProgram was updated"});
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const removeFavProgram = async (req, res) => {
    const {id} = req.params;
    const {programId} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(programId)) {
        return res.status(400).json({message: "id or program id is not of type obj id"});
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        if (!user.favPrograms.some((fav) => fav.toString() === programId)) {
            return res.status(400).json({message: "program does not exist"});
        }
        user.favPrograms = user.favPrograms.filter((fav) => fav.toString() !== programId);
        await user.save();
        return res.status(200).json({message: "user favProgram was updated"});
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const getFavPrograms = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "id is not of type obj id"});
    }
    try {
        const user = await User.findById(id).populate("favPrograms");
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        return res.status(200).json(user.favPrograms);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const addFavFood = async (req, res) => {
    const {id} = req.params;
    const {FoodId} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(FoodId)) {
        return res.status(400).json({message: "id or food id is not of type obj id"});
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        if (user.favFoods.includes(FoodId)) {
            return res.status(400).json({message: "food already favorited"});
        }
        user.favFoods.push(new mongoose.Types.ObjectId(FoodId));
        const updateFood = await Food.findByIdAndUpdate(
            FoodId,
            {
                isBookmarked: true,
            },
            {new: true}
        );

        await updateFood.save();
        await user.save();
        return res.status(200).json({message: "user favFood was updated"});
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const removeFavFood = async (req, res) => {
    const {id} = req.params;
    const {FoodId} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(FoodId)) {
        return res.status(400).json({message: "id or Food id is not of type obj id"});
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        if (!user.favFoods.some((fav) => fav.toString() === FoodId)) {
            return res.status(400).json({message: "Food does not exist"});
        }
        user.favFoods = user.favFoods.filter((fav) => fav.toString() !== FoodId);
        const updateFood = await Food.findByIdAndUpdate(
            FoodId,
            {
                isBookmarked: false,
            },
            {new: true}
        );

        await updateFood.save();
        await user.save();
        return res.status(200).json({message: "user favFood was updated"});
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const getFavFoods = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "id is not of type obj id"});
    }
    try {
        const user = await User.findById(id).populate("favFoods");
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        return res.status(200).json(user.favFoods);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
