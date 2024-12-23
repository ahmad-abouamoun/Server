import jwt from "jsonwebtoken";
import {createMeeting} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";
import {secretKey} from "../../Controller/userController.js";
jest.mock("../../Models/meeting.js");

describe("create meeting", () => {
    const mockToken = jwt.sign({id: "1", type: "user"}, secretKey);
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 400 if not all fields were provided", async () => {
        const req = {body: {token: "", startDate: "", endDate: "", expert: "", title: ""}};
        await createMeeting(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "all fields should be provided"});
    });
    it("should return status code 500 if an error occured in the Db", async () => {
        const req = {
            body: {
                token: mockToken,
                startDate: "2024-12-23T10:15:30.000Z",
                endDate: "2024-12-23T10:16:30.000Z",
                expert: "therapist",
                title: "mental health",
            },
        };
        Meeting.prototype.save.mockRejectedValue(new Error("Db error occured"));
        await createMeeting(req, res);
        const error = new Error("Db error occured");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: error.message});
    });
});
