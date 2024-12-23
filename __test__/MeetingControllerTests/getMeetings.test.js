import jwt from "jsonwebtoken";
import {getMeetings} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";
import {secretKey} from "../../Controller/userController.js";
jest.mock("../../Models/meeting.js");

describe("get meetings", () => {
    const decodedToken = {id: "1"};

    const mockToken = jwt.sign({id: "1", type: "user"}, secretKey);
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("should return 400 if token does not exist", async () => {
        const req = {body: {token: ""}};
        await getMeetings(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "token was not provided"});
    });
    it("should return 400 if token was not valid", async () => {
        const req = {body: {token: "mockToken"}};
        jwt.verify = jest.fn().mockImplementation(() => {
            throw new Error("invalid token");
        });
        await getMeetings(req, res);
        expect(jwt.verify).toHaveBeenCalledWith("mockToken", expect.any(String));
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "an error has occured"});
    });
    it("should return 400 if error in db occured", async () => {
        const req = {body: {token: mockToken}};
        Meeting.find.mockRejectedValue(new Error("error occured in Db"));
        await getMeetings(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "an error has occured"});
    });
    it("should return status code 200 if meetings were fetched successfully with no errors", async () => {
        const req = {body: {token: mockToken}};

        const mockData = [
            {
                startDate: "2024-12-23T10:15:30.000Z",
                endDate: "2024-12-23T10:16:30.000Z",
                expert: "therapist",
                title: "mental health",
                user_id: "1",
            },
            {
                startDate: "2024-12-23T10:16:30.000Z",
                endDate: "2024-12-23T10:17:30.000Z",
                expert: "therapist",
                title: "mental support",
                user_id: "1",
            },
        ];

        jwt.verify = jest.fn().mockReturnValue({id: "1", type: "user"});

        Meeting.find.mockResolvedValue(mockData);

        await getMeetings(req, res);

        expect(res.json).toHaveBeenCalledWith(mockData);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});
