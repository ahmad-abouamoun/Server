import {createUser} from "../../Controller/userController";
import {User} from "../../Models/user.js";
import bcrypt from "bcryptjs";

jest.mock("../../Models/user");
jest.mock("bcryptjs");

describe("signin", () => {
    it("should return status code 494 if user does not exist", async () => {});
});
