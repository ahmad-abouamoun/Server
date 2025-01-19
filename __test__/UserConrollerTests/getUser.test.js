import jwt from "jsonwebtoken";
import {getFavPrograms, getUser} from "../../Controller/userController.js";
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
    // it("should return status code 404 incase user does not exist", async () => {
    //     jwt.verify.mockReturnValue({id: "2"});

    //     User.findById = jest.fn().mockRejectedValue(null);
    //     await getFavPrograms(req, res);
    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({
    //         message: "user not found",
    //     });
    // });
});
