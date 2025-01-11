import {Program} from "../Models/programs.js";

//api that creates a program
export const createProgram = async (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({message: "name should be provided"});
    }
    try {
        const program = new Program({
            name,
            training: [],
            link: [],
            filename: req.file.filename,
        });
        await program.save();
        return res.status(200).json(program);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

//api that gets all the training programs
export const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        return res.status(200).json(programs);
    } catch (error) {
        return res.status(500).json({message: "error occured in Db"});
    }
};

//api that adds trainings and links to an existing program
export const updateProgram = async (req, res) => {
    const id = req.params.id;
    const {training, link} = req.body;

    try {
        const updatedProgram = await Program.findByIdAndUpdate(
            id,
            {
                $push: {
                    training: {$each: training},
                    link: {$each: link},
                },
            },
            {new: true}
        );
        if (!updatedProgram) {
            return res.status(400).json({message: "program does not exist"});
        }
        await updatedProgram.save();
        return res.status(200).json(updatedProgram);
    } catch (error) {
        return res.status(400).json({message: "an error occured"});
    }
};
