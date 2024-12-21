export const createMeeting = async (req, res) => {
    const {token, title, startDate, endDate, expert} = req.body;
    if (!token || !title || !startDate || !endDate || !expert) {
        return res.status(400).json({message: "all fields should be provided"});
    }
    res.status(200).json({message: "CreateMeeting api"});
};
