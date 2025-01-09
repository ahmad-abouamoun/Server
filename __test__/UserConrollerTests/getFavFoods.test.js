import jwt from "jsonwebtoken";
import {getFavFoods} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");

describe("get favorite foods", () => {
    const req = {
        headers: {
            token: jwt.sign({id: 1}, secretKey),
        },
    };
    const mockData = [{id: "1", name: "food1"}];
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 404 incase user does not exist", async () => {
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(null),
        });
        await getFavFoods(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "User Not Found",
        });
    });

    it("should return status code 200 incase no error occured", async () => {
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue({
                _id: "1",
                favFoods: mockData,
            }),
        });
        await getFavFoods(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });
    it("should return status code 500 incase of error ", async () => {
        User.findById.mockReturnValue({
            populate: jest.fn().mockRejectedValue({
                _id: "1",
                favFoods: mockData,
            }),
        });
        await getFavFoods(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Something went wrong",
        });
    });
});
