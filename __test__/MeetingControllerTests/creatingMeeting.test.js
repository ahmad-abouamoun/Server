import {json} from "express";
import {createMeeting} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";

jest.mock("../../Models/meeting.js");

describe("create meeting", () => {
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 400 if not all fields were provided", async () => {
        const req = {body: {token: "", startDate: "", endDate: "", expert: "", title: ""}};
    });
});
