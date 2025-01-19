import jwt from "jsonwebtoken";
import {addFavFood} from "../../Controller/userController.js";
import {secretKey} from "../../Controller/userController.js";

import {User} from "../../Models/user.js";

jest.mock("../../Models/user");

describe("add favorite food", () => {
    const req = {
        body: {
            FoodId: "507f191e810c19729de860ec",
            token: jwt.sign({id: 1}, secretKey),
        },
    };

    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 500 incase of error in DB", async () => {
        User.findById.mockRejectedValue(null);
        await addFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Something went wrong",
        });
    });
    it("should return status code 400 incase id or food id are not provided", async () => {
        const req = {
            body: {
                FoodId: "",
                token: jwt.sign({id: 1}, secretKey),
            },
        };
        await addFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "id or food id is not provided"});
    });
    it("should return status code 404 incase user does not exist", async () => {
        User.findById.mockResolvedValue(null);
        await addFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "User Not Found",
        });
    });
    it("should return status code 401 incase food already favorted", async () => {
        const mockData = {
            favFoods: [req.body.FoodId],
        };
        User.findById.mockResolvedValue(mockData);
        await addFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "food already favorited",
        });
    });
    it("should return status code 200 incase no error occured", async () => {
        const mockData = {
            favFoods: [],
            save: jest.fn(),
        };
        User.findById.mockResolvedValue(mockData);
        await addFavFood(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: "user favFood was updated"});
    });
});
