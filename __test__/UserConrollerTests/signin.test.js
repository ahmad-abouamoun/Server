import {Signin} from "../../Controller/userController";
import {User} from "../../Models/user.js";
import bcrypt from "bcryptjs";

jest.mock("../../Models/user");
jest.mock("bcryptjs");

describe("signin", () => {
    const req = {
        body: {
            email: "john@example.com",
            password: "password123",
            type: "coach",
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("should return status code 400 if user does not exist", async () => {
        User.findOne.mockResolvedValue(null);
        await Signin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "user does not exist "});
    });
});
