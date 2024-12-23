import {Program} from "../Models/programs.js";

export const createProgram = async (req, res) => {
    const {name, training, link} = req.body;
    if (!name) {
        return res.status(400).json({message: "name should be provided"});
    }
    try {
        const program = new Program({
            name,
            training: training || [],
            link: link || [],
            filename: req.file.filename,
        });
        await program.save();
        return res.status(200).json(program);
    } catch (error) {
        return res.status(400).json({message: error});
    }
};
export const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        return res.status(200).json(programs);
    } catch (error) {
        return res.status(500).json({message: "error occured in Db"});
    }
};

export const updateProgram = async (req, res) => {};
