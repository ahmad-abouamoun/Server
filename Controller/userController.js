import {User} from "../Models/user.js";

export const getUsers = async (req, res) => {
    const users = await User.find({type: "user"});
    return res.json(users);
};
export const getExperts = async (req, res) => {
    const users = await User.find({$or: [{type: "coach"}, {type: "nutritionist"}, {type: "therapist"}]});
    return res.json(users);
};
