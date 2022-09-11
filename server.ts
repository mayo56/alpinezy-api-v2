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
const io = new Server(httpServer);
io.on("connection", (socket) => {

});


/**
 * Partie Rest API
 */
import { user } from "./REST/routes/user";
app.use(cors({"origin":"*"}))
app.use(express.json({ limit: "1GB" }));
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);


//Serveur connexion
httpServer.listen(3000, () => {
    console.log("App is ready");
});