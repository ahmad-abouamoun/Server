import jwt from "jsonwebtoken";
import {removeFavProgram} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";
import jwt from "jsonwebtoken";

jest.mock("../../Models/user");
describe("remove favorite program", () => {
    const req = {
        body: {
            programId: "1",
            token: jwt.sign({id: 1}, secretKey),
        },
    };
});
