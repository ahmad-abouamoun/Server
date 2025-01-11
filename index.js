import express from "express";
import connectToDatabase from "./connect.js";
import userRoute from "./Route/userRoute.js";
import foodRoute from "./Route/foodRoute.js";
import meetingRoute from "./Route/meetingRoute.js";
import cors from "cors";
import {Server} from "socket.io";

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

const io = new Server(8000, {
    cors: {
        origin: "*",
    },
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
    socket.on("room:join", (data) => {
        const {email, room} = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", {email, id: socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({to, offer}) => {
        io.to(to).emit("incomming:call", {from: socket.id, offer});
    });

    socket.on("call:accepted", ({to, ans}) => {
        io.to(to).emit("call:accepted", {from: socket.id, ans});
    });

    socket.on("peer:nego:needed", ({to, offer}) => {
        io.to(to).emit("peer:nego:needed", {from: socket.id, offer});
    });

    socket.on("peer:nego:done", ({to, ans}) => {
        io.to(to).emit("peer:nego:final", {from: socket.id, ans});
    });
});
app.listen(8080, async () => {
    console.log("hello world");
    await connectToDatabase();
});
