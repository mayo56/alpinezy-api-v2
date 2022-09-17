import http from "node:http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
require("dotenv").config({ path: "./config/.env" });

const app = express();
const httpServer = http.createServer(app);

/**
 * Partie WebSocket
 */
import jwt from "jsonwebtoken";
const io = new Server(httpServer, { "cors": { "origin": "*" } });
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        const user = jwt.verify(token, process.env.TOKEN_JWT as string)
        console.log(user);
    } catch (err) {
        const error = new Error("Not Authorized")
        console.log(error)
        return next(error)
    }
    next()
})
io.on("connection", (socket) => {
    console.log("connected:", socket.id)
});


/**
 * Partie Rest API
 */
import { user } from "./REST/routes/user";
app.use(cors({ "origin": "*" }))
app.use(express.json({ limit: "1GB" }));
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);


//Serveur connexion
httpServer.listen(3000, () => {
    console.log("App is ready");
});