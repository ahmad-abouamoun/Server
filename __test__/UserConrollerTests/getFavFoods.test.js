import jwt from "jsonwebtoken";
import {getFavFoods} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");

describe("get favorite foods", () => {
    const req = {
        headers: {
            token: jwt.sign({id: 1}, secretKey),
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 404 incase user does not exist", async () => {
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(null),
        });
        await getFavFoods(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "User Not Found",
        });
    });
});
