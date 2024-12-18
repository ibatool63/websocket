import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("WebSocket server is running!");
});

const server = app.listen(port, () => {
    console.log(`Server is listening: http://localhost:${port}`);
});

const webServer = new WebSocketServer({ server });

webServer.on("connection", (ws) => {
    console.log("A new client is connected");

    const intervalId = setInterval(() => {
        const randomData = {
            data: Math.floor(Math.random() * 100),
            time: new Date().toISOString(),
        };
        ws.send(JSON.stringify(randomData));
    }, 2000);

    ws.on("message", (data) => {
        console.log("Data from client:", data.toString());
        ws.send("Hey, Thanks for your message!");
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        clearInterval(intervalId);
    });

    ws.on("error", (error) => {
        console.error("WebSocket error:", error);
    });
});

