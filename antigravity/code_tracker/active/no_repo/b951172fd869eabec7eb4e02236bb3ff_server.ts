€import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // Chat Room Logic
        socket.on("join_chat", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined chat room: ${room}`);
        });

        socket.on("send_message", (data) => {
            // data: { room, user, content, timestamp }
            io.to(data.room).emit("receive_message", data);
        });

        // Multiplayer Game Logic (Simplified)
        socket.on("join_game", (gameId) => {
            socket.join(gameId);
            io.to(gameId).emit("player_joined", { id: socket.id });
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
€*cascade082file:///c:/quiz/server.ts