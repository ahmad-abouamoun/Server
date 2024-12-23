export const createProgram = async (req, res) => {
    const {name, training, link} = req.body;
    if (!name) {
        return res.status(400).json({message: "name should be provided"});
    }
    return res.status(200).json({message: "createProgram"});
};
