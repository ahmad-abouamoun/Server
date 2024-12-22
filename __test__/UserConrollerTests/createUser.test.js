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
            diseases: JSON.parse(req.body.diseases),
        });

        await createUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({email: req.body.email});
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
        expect(User.prototype.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        //ask taha about this why is it not working properly
        expect(res.json).toHaveBeenCalledWith();
    });
    it("should give status code 400 if any field is missing", async () => {});
});
