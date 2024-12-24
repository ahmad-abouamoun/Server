import {Schema, model} from "mongoose";
import {Program} from "./programs.js";
import {Food} from "./food.js";

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
    favFoods: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food",
        },
    ],
    favPrograms: [
        {
            type: Schema.Types.ObjectId,
            ref: "Program",
        },
    ],
});

export const User = model("User", userSchema);
