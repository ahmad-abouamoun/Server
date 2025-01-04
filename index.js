import express from "express";
import connectToDatabase from "./connect.js";
import userRoute from "./Route/userRoute.js";
import foodRoute from "./Route/foodRoute.js";
import meetingRoute from "./Route/meetingRoute.js";
import cors from "cors";
import programsRoute from "./Route/programsRoute.js";
const app = express();
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("Images"));
app.use("/users", userRoute);
app.use("/food", foodRoute);
app.use("/meetings", meetingRoute);
app.use("/programs", programsRoute);

app.listen(8080, async () => {
    console.log("hello world");
    await connectToDatabase();
});
