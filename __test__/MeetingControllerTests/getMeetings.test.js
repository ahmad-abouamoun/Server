import jwt from "jsonwebtoken";
import {getMeetings} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";
import {secretKey} from "../../Controller/userController.js";
jest.mock("../../Models/meeting.js");

describe("get meetings", () => {
    const mockToken = jwt.sign({id: "1", type: "user"}, secretKey);
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("should return 400 if token does not exist", async () => {
        const req = {body: {token: ""}};
        await getMeetings(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "token was not provided"});
    });
});
