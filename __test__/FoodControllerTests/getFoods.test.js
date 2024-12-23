import {json} from "express";
import {createFood} from "../../Controller/foodController";
import {Food} from "../../Models/food";

jest.mock("../../Models/food");

describe("get foods", () => {
    const req = {};
    const res = {status: jest.fn().mockReturnThis, json: jest.fn()};
    it("should return status code 500 if an error in the db occured", async () => {});
});
