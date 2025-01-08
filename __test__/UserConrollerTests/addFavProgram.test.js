import jwt from "jsonwebtoken";
import {addFavProgram} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";
import bcrypt from "bcryptjs";

jest.mock("../../Models/user");

describe("add favorite program", () => {
    const req = {
        body: {
            programId: "1",
            token: jwt.sign({id: 1}, secretKey),
        },
    };

    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 500 incase of error in DB", async () => {
        User.findById.mockRejectedValue(null);
        await addFavProgram(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Something went wrong",
        });
    });
    it("should return status code 400 incase id or program are not provided", async () => {
        const req = {
            body: {
                programId: "",
                token: jwt.sign({id: 1}, secretKey),
            },
        };

        User.findById.mockRejectedValue(null);
        await addFavProgram(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "id or program id is not defined"});
    });
    it("should return status code 404 incase user does not exist", async () => {
        User.findById.mockResolvedValue(null);
        await addFavProgram(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "User Not Found",
        });
    });
});
