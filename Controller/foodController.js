export const createFood = async (req, res) => {
    const {name, description, diseases} = req.body;
    try {
        if (!name || !description || !diseases) {
            return res
            .status(400)
            .json({message: `${name} ${description} ${diabetes} ${hypertension} ${highCholesterol}`});
        }
        const newFood = new Food({
            name,
            description,
            diseases,
            filename: req.file.filename,
        });

        await newFood.save();
        res.status(201).json({
            newFood,
        });
    } catch (error) {
        console.error("Error creating food:", error.message);
        res.status(500).json({message: "Internal Server Error while creating the food"});
    }
};
