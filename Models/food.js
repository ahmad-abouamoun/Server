import {Schema, model} from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    diseases: {
        diabetes: {
            type: Boolean,
            required: true,
        },
        highCholesterol: {
            type: Boolean,
            required: true,
        },
        hypertension: {
            type: Boolean,
            required: true,
        },
    },

    description: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
});

export const Food = model("Food", foodSchema);
