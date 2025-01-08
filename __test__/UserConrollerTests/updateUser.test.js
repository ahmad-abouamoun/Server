import {updateUser} from "../../Controller/userController.js";
import {User} from "../../Models/user.js";
import jwt from "jsonwebtoken";
import {secretKey} from "../../Controller/userController.js";
jest.mock("../../Models/user.js");

describe("update User", () => {
    const req = {
        body: {
            name: "John",
            token: jwt.sign({id: 1}, secretKey),
            diseases: '{"diabetes": true, "highCholesterol": true, "hypertension": true}',
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("it should return status code 200 if user updated with no errors", async () => {
        const mockUser = {
            _id: "1",
            name: "John Doe",
            type: "user",
            password: "hashedPassword123",
            email: "johndoe@example.com",
            banned: false,
            filename: "profile1.png",
            diseases: {
                diabetes: false,
                highCholesterol: false,
                hypertension: false,
            },
            save: jest.fn().mockResolvedValue(true),
        };
        User.findByIdAndUpdate.mockResolvedValue(mockUser);
        await updateUser(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            1,
            {name: "John", diseases: '{"diabetes": true, "highCholesterol": true, "hypertension": true}'},
            {new: true}
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });
    it("should return status code 404 if user not found", async () => {
        User.findByIdAndUpdate.mockResolvedValue(null);
        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: "User Not Found"});
    });
    it("should return status code 500 if error in db occured", async () => {
        User.findByIdAndUpdate.mockRejectedValue(null);
        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "error.message"});
    });
});
