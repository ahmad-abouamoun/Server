import {json} from "express";
import {createFood} from "../../Controller/foodController";
import {Food} from "../../Models/food";

jest.mock("../../Models/food");

describe("create food", () => {
    it("should return status code 400 if not all fields were provided", async () => {
        const req = {body: {name: "", desription: "", diseases: "{}"}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
        await createFood(req, res);
        expect(res.json).toHaveBeenCalledWith({message: `all fileds should be provided`});
        expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should return status code 500 if error occured in the Db", async () => {});
});
