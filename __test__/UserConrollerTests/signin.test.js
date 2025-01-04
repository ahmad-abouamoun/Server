import jwt from "jsonwebtoken";
import {Signin} from "../../Controller/userController";
import {User} from "../../Models/user.js";
import bcrypt from "bcryptjs";

jest.mock("../../Models/user");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

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
    it("should return status code 500 if error in db occured", async () => {
        User.findOne.mockRejectedValue(null);
        await Signin(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "error occured with the Db."});
    });
    it("should return status code 401 if user is banned", async () => {
        const mockUser = {
            _id: "1",
            email: "john@example.com",
            password: "hashedPassword123",
            banned: true,
        };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockImplementation((password, hashedpassword, callback) => {
            callback(null, true);
        });
        await Signin(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({message: "user has been banned"});
    });
    it("should return status code 400 if incorrect password was given", async () => {
        const mockUser = {
            _id: "1",
            email: "john@example.com",
            password: "hashedPassword123",
        };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockImplementation((password, hashedpassword, callback) => {
            callback(null, false);
        });
        await Signin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "error with authenticating."});
    });
    it("should return status code 200 if no errors occured", async () => {
        const mockuser = {
            _id: "1",
            email: "john@example.com",
            password: "hashedPassword123",
            banned: false,
            type: "user",
        };
        User.findOne.mockResolvedValue(mockuser);
        bcrypt.compare.mockImplementation((password, hashedpassword, callback) => {
            callback(null, true);
        });
        const mockToken = "mocktoken";
        jwt.sign.mockReturnValue(mockToken);

        await Signin(req, res);

        expect(User.findOne).toHaveBeenCalledWith({email: "john@example.com"});
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockuser.password, expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User indeed exists.",
            token: mockToken,
        });
    });
});
