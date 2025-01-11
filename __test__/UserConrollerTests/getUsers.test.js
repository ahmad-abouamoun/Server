import {getUsers} from "../../Controller/userController.js";
import {User} from "../../Models/user.js";

jest.mock("../../Models/user.js");

describe("getUsers", () => {
    it('should return only users with type "user"', async () => {
        const mockUsers = [
            {
                _id: "1",
                name: "John Doe",
                email: "johndoe@example.com",
                banned: false,
            },
            {
                _id: "2",
                name: "Jane Smith",
                email: "janesmith@example.com",
                banned: false,
            },
        ];

        User.find.mockReturnValue({
            select: jest.fn().mockResolvedValue(mockUsers),
        });
        const req = {};
        const res = {json: jest.fn()};

        await getUsers(req, res);

        expect(User.find).toHaveBeenCalledWith({type: "user"});
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
    it("should return only the users with type 'user'", async () => {
        const mockUsers = [
            {
                _id: "1",
                name: "John Doe",
                email: "johndoe@example.com",
                banned: false,
                type: "user",
            },
            {
                _id: "2",
                name: "Jane Smith",
                email: "janesmith@example.com",
                banned: false,
                type: "admin",
            },
        ];

        User.find.mockReturnValue({
            select: jest.fn().mockResolvedValue(mockUsers.filter((user) => user.type === "user")),
        });

        const req = {};
        const res = {json: jest.fn()};

        const expectedOutput = [
            {
                _id: "1",
                name: "John Doe",
                email: "johndoe@example.com",
                banned: false,
                type: "user",
            },
        ];

        await getUsers(req, res);

        expect(User.find).toHaveBeenCalledWith({type: "user"});
        expect(res.json).toHaveBeenCalledWith(expectedOutput);
    });
});
