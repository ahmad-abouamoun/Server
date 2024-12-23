import {json} from "express";
import {getFoods} from "../../Controller/foodController";
import {Food} from "../../Models/food";

jest.mock("../../Models/food");

describe("get foods", () => {
    const req = {};
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

    it("should return status code 500 if an error in the db occured", async () => {
        Food.find.mockRejectedValue(new Error("error in the Db"));
        await getFoods(req, res);
        expect(res.json).toHaveBeenCalledWith({message: "Internal Server Error while fetching the food"});

        expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return status code 200 if no error occured", async () => {
        const mockData = {
            name: "strawberry",
            description: "very delicious",
            diseases: {diabetes: false, highCholesterol: false, hypertension: false},
            filename: "strawberry.png",
        };
        Food.find.mockResolvedValue(mockData);
        await getFoods(req, res);
    });
});
