import jwt from "jsonwebtoken";
import {getFavPrograms} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");
describe("get favorite programs", () => {
    const req = {
        body: {
            programId: "1",
            token: jwt.sign({id: 1}, secretKey),
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
});
