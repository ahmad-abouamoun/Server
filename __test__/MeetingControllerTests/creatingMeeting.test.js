import {createMeeting} from "../../Controller/meetingController.js";
import {Meeting} from "../../Models/meeting.js";

jest.mock("../../Models/meeting.js");

describe("create meeting", () => {
    it("should return status code 400 if not all fields were provided", async () => {});
});
