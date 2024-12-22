import {getUsers} from "../Controller/userController.js";
import {User} from "../Models/user.js";

jest.mock("../Models/user.js");

describe("getUsers", () => {
    it('should return only users with type "user"', async () => {
        const mockUsers = [
            {
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
            },
            {
                _id: "2",
                name: "Jane Smith",
                type: "user",
                password: "hashedPassword456",
                email: "janesmith@example.com",
                banned: false,
                filename: "profile2.png",
                diseases: {
                    diabetes: true,
                    highCholesterol: true,
                    hypertension: false,
                },
            },
        ];

        User.find.mockResolvedValue(mockUsers);

        const req = {};
        const res = {json: jest.fn()};

        await getUsers(req, res);

        expect(User.find).toHaveBeenCalledWith({type: "user"});
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
    it("should return only the user with user type 'user' ", async () => {
        const mockUsers = [
            {
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
            },
            {
                _id: "2",
                name: "Jane Smith",
                type: "admin",
                password: "hashedPassword456",
                email: "janesmith@example.com",
                banned: false,
                filename: "profile2.png",
                diseases: {
                    diabetes: true,
                    highCholesterol: true,
                    hypertension: false,
                },
            },
        ];
        User.find.mockResolvedValue(mockUsers.filter((user) => user.type === "user"));
    });
});
