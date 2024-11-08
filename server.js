const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const httpServer = http.createServer(server);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.prepare().then(() => {
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.use(express.static('public'));

    io.on('connection', (socket) => {
        console.log('A user connected');

        const heartbeatInterval = setInterval(() => {
            socket.emit('heartbeat');
        }, 30000);

        socket.on('heartbeat', () => {
            console.log('Heartbeat received from:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
            clearInterval(heartbeatInterval);
        });
    });

    httpServer.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
