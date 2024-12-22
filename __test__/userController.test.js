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
    });
});
