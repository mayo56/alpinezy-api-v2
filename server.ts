import http from "node:http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const httpServer = http.createServer(app);


const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("One connexion")
});

app.get('/usr', function (req, res) {
    const lol = req.query.id;
    res.header('Content-type', 'text/html');
    return res.end('<h1>Hello, Secure World!' + lol + '</h1>');
});


//connect server
httpServer.listen(3000, () => {
    console.log("App is ready")
});