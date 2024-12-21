import {Schema, model} from "mongoose";

const meetingSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    expert: {
        type: String,
        required: true,
    },
});

export const Meeting = model("Meeting", meetingSchema);
