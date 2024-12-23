import {createFood} from "../../Controller/foodController";
import {Food} from "../../Models/food";

jest.mock("../../Models/food");

describe("create food", () => {
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    it("should return status code 400 if not all fields were provided", async () => {
        const req = {body: {name: "", desription: "", diseases: "{}"}};
        await createFood(req, res);
        expect(res.json).toHaveBeenCalledWith({message: `all fileds should be provided`});
        expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should return status code 500 if error occured in the Db", async () => {
        const req = {
            body: {
                name: "strawberry",
                description: "very delicious",
                diseases: '{"diabetes": false, "highCholesterol": false, "hypertension": false}',
            },
            file: {filename: "strawberry.png"},
        };
        Food.prototype.save.mockRejectedValue(new Error("Database error"));
        await createFood(req, res);
        expect(res.json).toHaveBeenCalledWith({message: "Internal Server Error while creating the food"});
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return status code 201 if no error occured ", async () => {});
});
