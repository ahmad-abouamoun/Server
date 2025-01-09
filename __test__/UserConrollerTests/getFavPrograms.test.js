import jwt from "jsonwebtoken";
import {getFavPrograms, removeFavProgram} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");
describe("get favorite programs", () => {
    const req = {
        headers: {
            token: jwt.sign({id: 1}, secretKey),
        },
    };
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("should return status code 404 incase user does not exist", async () => {
        const mockData = [{id: "1", name: "program1"}];
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(null),
        });
        await getFavPrograms(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "User Not Found",
        });
    });

    it("should return status code 404 incase user does not exist", async () => {
        const mockData = [{id: "1", name: "program1"}];
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue({
                _id: "1",
                favPrograms: mockData,
            }),
        });
        await getFavPrograms(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });
});
