import jwt from "jsonwebtoken";
import {getUser} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");
describe("get users data", () => {
    const req = {
        headers: {
            token: jwt.sign({id: 1}, secretKey),
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
});
