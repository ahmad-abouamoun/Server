import {Schema, model} from "mongoose";

const meetingSchema = new Schema({
    Meetings: {
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
            type: ObjectId,
            required: true,
        },
        expert: {
            type: String,
            required: true,
        },
    },
});

export const Food = model("Meeting", meetingSchema);
