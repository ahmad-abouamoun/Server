import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    banned: {
        type: Boolean,
        required: true,
    },
    filename: {
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
    favFoods: {
        type: [String],
        default: [],
    },
    favPrograms: {
        type: [String],
        default: [],
    },
});

export const User = model("User", userSchema);
