import {updateUser} from "../../Controller/userController.js";
import {User} from "../../Models/user.js";

jest.mock("../../Models/user.js");

describe("update User", () => {
    it("it should return status code 200 if user updated with no errors", async () => {
        const req = {
            body: {
                name: "John",

                diseases: '{"diabetes": true, "highCholesterol": true, "hypertension": true}',
            },
            params: {id: 1},
        };
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    });
});
