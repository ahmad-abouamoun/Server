import {getExperts} from "../../Controller/userController.js";
import {User} from "../../Models/user.js";

jest.mock("../../Models/user.js");

describe("getUsers", () => {
    it('should return only users with type "coach","therapist",or "nutritionist"', async () => {
        const mockUsers = [
            {
                _id: "1",
                name: "John Doe",
                type: "coach",
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
                type: "therapist",
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

        await getExperts(req, res);

        expect(User.find).toHaveBeenCalledWith({$or: [{type: "coach"}, {type: "nutritionist"}, {type: "therapist"}]});
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
    it('should return only users with type "coach","therapist",or "nutritionist"', async () => {
        const mockUsers = [
            {
                _id: "1",
                name: "John Doe",
                type: "coach",
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
                type: "nutritionist",
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
            {
                _id: "3",
                name: "george",
                type: "user",
                password: "hashedPassword456",
                email: "george@example.com",
                banned: false,
                filename: "profile3.png",
                diseases: {
                    diabetes: false,
                    highCholesterol: false,
                    hypertension: false,
                },
            },
        ];
        User.find.mockResolvedValue(
            mockUsers.filter((user) => ["coach", "therapist", "nutritionist"].includes(user.type))
        );
    });
});
