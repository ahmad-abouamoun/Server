import jwt from "jsonwebtoken";
import {removeFavFood} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");

describe("remove favorite food", () => {
    const req = {
        body: {
            FoodId: "507f191e810c19729de860ec",
            token: jwt.sign({id: 1}, secretKey),
        },
    };

    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 500 incase of error in DB", async () => {
        User.findById.mockRejectedValue(null);
        await removeFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Something went wrong",
        });
    });
    it("should return status code 400 incase id or program are not provided", async () => {
        const req = {
            body: {
                programId: "",
                token: jwt.sign({id: 1}, secretKey),
            },
        };

        User.findById.mockRejectedValue(null);
        await removeFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "id or food id is not defined"});
    });
});
