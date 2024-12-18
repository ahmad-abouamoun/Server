import express from "express";
import connectToDatabase from "./connect.js";
const app = express();

app.listen(8080, () => {
    console.log("hello world");
    connectToDatabase();
});
