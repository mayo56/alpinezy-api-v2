import http from "node:http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const httpServer = http.createServer(app);


/**
 * Partie WebSocket
 */
const io = new Server(httpServer);
io.on("connection", (socket) => {
    console.log("One connexion");
});


/**
 * Partie Rest API
 */
app.use(express.json({limit:"1GB"}));
app.use();


//Serveur connexion
httpServer.listen(3000, () => {
    console.log("App is ready");
});