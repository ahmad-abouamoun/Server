import {Food} from "../Models/food.js";

//used to create food
export const createFood = async (req, res) => {
    const {name, description} = req.body;
    const diseases = JSON.parse(req.body.diseases);

    try {
        if (!name || !description || !diseases) {
            return res.status(400).json({message: `all fileds should be provided`});
        }
        const newFood = new Food({
            name,
            description,
            diseases,
            filename: req.file.programImage,
        });

        await newFood.save();
        res.status(201).json({message: "food was created"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error while creating the food"});
    }
};

//used to get all food from the db
export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error while fetching the food"});
    }
};
