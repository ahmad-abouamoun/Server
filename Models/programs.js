import {Schema, model} from "mongoose";

const programSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    training: {
        type: [String],
        default: [],
    },
    link: {
        type: [String],
        default: [],
    },

    filename: {
        type: String,
        required: true,
    },
});

export const Program = model("Program", programSchema);
