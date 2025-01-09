import jwt from "jsonwebtoken";
import {getUser} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");
jest.mock("jsonwebtoken");

describe("get users data", () => {
    const req = {
        headers: {
            token: jwt.sign({id: 1}, secretKey),
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockUsers = {
        _id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "hashedPassword123",
        banned: false,
        type: "user",
        diseases: {
            diabetes: true,
            highCholesterol: true,
            hypertension: true,
        },
        filename: "image.png",
    };
    it("should return status code 400 incase error with the jwt", async () => {
        jwt.verify.mockImplementation("error occured");
        await getUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "error with jwt token"});
    });
});
