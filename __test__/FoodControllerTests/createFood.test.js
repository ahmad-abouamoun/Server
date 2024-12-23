import {createFood} from "../../Controller/foodController";
import {Food} from "../../Models/food";

jest.mock("../../Models/food");

describe("create food", () => {
    it("should return status code 400 if not all fields were provided", async () => {});
});
