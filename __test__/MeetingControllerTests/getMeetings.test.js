import jwt from "jsonwebtoken";
import {getMeetings} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";
jest.mock("../../Models/meeting.js");

describe("get meetings", () => {
    const mockToken = jwt.sign({id: "1", type: "user"}, secretKey);
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("should return 400 if token does not exist", async () => {
        const req = {body: {token: ""}};
    });
});
