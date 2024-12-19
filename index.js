import express from "express";
import connectToDatabase from "./connect.js";
import userRoute from "./Route/userRoute.js";
const app = express();
app.use(express.json());

app.use("/users", userRoute);

app.listen(8080, async () => {
    console.log("hello world");
    await connectToDatabase();
});
