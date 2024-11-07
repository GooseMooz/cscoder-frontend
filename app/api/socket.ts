import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Socket } from "net";

export default function handler(req: NextApiRequest, res: NextApiResponse & { socket: { server: Socket & { io?: Server } } }) {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.io server...");
        const io = new Server(res.socket.server as unknown as HTTPServer);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("Client connected");

            socket.on("heartbeat", () => {
                socket.emit("heartbeat", { status: "active" });
            });

            socket.on("new_problem", (problem) => {
                socket.broadcast.emit("new_problem", problem);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }
    res.end();
}