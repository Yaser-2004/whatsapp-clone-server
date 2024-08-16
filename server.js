import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";


const port = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.once("open", () => {
    console.log("db connected");
})

app.get("/", (req, res) => {
    res.send("Hello its whatsapp");
})


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

//d92kKHbeluHWN97A