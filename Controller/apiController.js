import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const therapistAi = async (req, res) => {
    const {userMessage} = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "system", content: "You are a kind and helpful therapist."},
                    {role: "user", content: userMessage},
                ],
                temperature: 0.7,
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const therapistResponse = response.data.choices[0];
        res.json(therapistResponse.message.content);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({error: "Error communicating with OpenAI"});
    }
};
export const modelHandler = async (req, res) => {
    const {trainingData} = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "i just need you to analyze the trainings provided in the trainingData scaling on the intensity from 0 to 10  and these are the only muscles that you are targeting FinalBaseMesh, Chest, Abs, ForeArms, Biceps, Triceps, Shoulders, ObliqueMuscles, Quads, Calves, Hamstring, UpperBack, LowerBack and make sure the data will be in dictionary format and each muscle is the key and its intensity is its value and each muscle has an intensity value that you will provide according to the traingings they provided and make sure the final mesh data will alwats return with intensity 0 and be harsh on the ratings and only return data with the muscles i provided and always provide them all even if they have 0 intensity and do not repeat muscles and always return the data in json",
                    },
                    {role: "user", content: trainingData},
                ],
                temperature: 1,
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const therapistResponse = response.data.choices[0];
        res.json(therapistResponse.message.content);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({error: "Error communicating with OpenAI"});
    }
};
