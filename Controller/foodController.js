export const createFood = async (req, res) => {
    const {name, description, diseases} = req.body;
    if (!name || !description || !diseases) {
        return res.status(400).json({message: `${name} ${description} ${diabetes} ${hypertension} ${highCholesterol}`});
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
};
