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
