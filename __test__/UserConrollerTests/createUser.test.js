import {createUser} from "../../Controller/userController";
import {User} from "../../Models/user.js";
import bcrypt from "bcryptjs";

jest.mock("../../Models/user");
jest.mock("bcryptjs");

describe("createUser", () => {
    it("should create a new user and return 200 if no errors", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                type: "coach",
                diseases: '{"diabetes": false, "highCholesterol": false, "hypertension": false}',
            },
            file: {filename: "profile.png"},
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        bcrypt.hash.mockResolvedValue("hashedPassword123");

        User.findOne.mockResolvedValue(null);

        User.prototype.save.mockResolvedValue({
            name: "John Doe",
            email: "john@example.com",
            password: "hashedPassword123",
            type: "coach",
            filename: "profile.png",
            diseases: {diabetes: false, highCholesterol: false, hypertension: false},
        });

        await createUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({email: req.body.email});
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
        expect(User.prototype.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith();
    });

    it("should give status code 400 if any field is missing", async () => {
        const req = {body: {name: "", email: "", password: "", type: "", diseases: "{}"}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "All fields are required."});
    });
    it("should return 400 if the email is already registered", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                type: "coach",
                diseases: '{"diabetes": false, "highCholesterol": false, "hypertension": false}',
            },
            file: {filename: "profile.png"},
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        User.findOne.mockResolvedValue({email: "john@example.com"});
        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(User.findOne).toHaveBeenCalledWith({email: "john@example.com"});

        expect(res.json).toHaveBeenCalledWith({message: "Email already registered."});
    });
    it("should return 400 if there is an error saving the user", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
                type: "coach",
                diseases: '{"diabetes": false, "highCholesterol": false, "hypertension": false}',
            },
            file: {filename: "profile.png"},
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        User.findOne.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue("hashedpassword123");
        User.prototype.save.mockRejectedValue(new Error("Database Error"));

        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "error occured with the Db."});
    });
});
