import {json} from "express";
import {createMeeting} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";

jest.mock("../../Models/meeting.js");

describe("create meeting", () => {
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
                token: "mocktoken",
                startDate: "2024-12-23T10:15:30.000Z",
                endDate: "2024-12-23T10:16:30.000Z",
                expert: "therapist",
                title: "mental health",
            },
        };
    });
});
