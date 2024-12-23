import {Program} from "../Models/programs.js";

export const createProgram = async (req, res) => {
    const {name, training, link} = req.body;
    if (!name) {
        return res.status(400).json({message: "name should be provided"});
    }
    const program = new Program({
        name,
        training: training || [],
        link: link || [],
        filename: req.file.filename,
    });
    await program.save();
    return res.status(200).json(program);
};
