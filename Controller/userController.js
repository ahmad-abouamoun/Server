import {User} from "../Models/user.js";

export const getUsers = async (req, res) => {
    const users = await User.find({type: "user"});
    return res.json(users);
};
