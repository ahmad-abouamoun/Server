import jwt from "jsonwebtoken";
import {addFavProgram, secretKey} from "../../Controller/userController";
import {User} from "../../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../../Models/user");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("add favorite program", () => {
    const req = {
        programId: "1",
        token: jwt.sign({id: 1}, secretKey),
    };
    it("should return status code 500 incase of error in DB", async () => {});
});
