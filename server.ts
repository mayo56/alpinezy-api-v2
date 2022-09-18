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

//Vérif du token
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        const user = jwt.verify(token, process.env.TOKEN_JWT as string) as {user_id:string, username:string, user_code:string}
        console.log(user)
        socket.join(`${user.user_id}`)
    } catch (err) {
        const error = new Error("Not Authorized")
        console.log(error)
        return next(error)
    }
    next()
})
//Évènement lors de la connection au WS
io.on("connection", (socket) => connectEvent(socket, io));







/**
 * Partie Rest API
 */
import { user } from "./REST/routes/user";
import { connectEvent } from "./WebSocket/WSconnexion";
app.use(cors({ "origin": "*" }))
app.use(express.json({ limit: "1GB" }));
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);


//Serveur connexion
httpServer.listen(3000, () => {
    console.log("App is ready");
});