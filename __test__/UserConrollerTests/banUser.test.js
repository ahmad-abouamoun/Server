import {banUser} from "../../Controller/userController.js";
import {User} from "../../Models/user.js";

jest.mock("../../Models/user.js");

const req = {params: {id: 1}};
const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

describe("banUser", () => {
    it("should update the user state to banned and return status code 200 if no errors", async () => {
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
            save: jest.fn().mockResolvedValue({
                _id: "1",
                name: "John Doe",
                type: "user",
                password: "hashedPassword123",
                email: "johndoe@example.com",
                banned: true,
                filename: "profile1.png",
                diseases: {
                    diabetes: false,
                    highCholesterol: false,
                    hypertension: false,
                },
            }),
        };

        User.findById.mockResolvedValue(mockUser);

        await banUser(req, res);

        expect(User.findById).toHaveBeenCalledWith(1);
        expect(mockUser.banned).toBe(true);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });
});
