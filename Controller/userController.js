import {User} from "../Models/user.js";

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

export const Signin = async (req, res) => {
    const {email, password, type} = req.body;
    console.log(req.body);
    const user = await User.findOne({email: email});
    console.log(user);
    if (!user) {
        return res.status(400).json({message: `user does not exist `});
    }
};
