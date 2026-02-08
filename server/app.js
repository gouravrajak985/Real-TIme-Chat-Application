import express from 'express'
import cors from 'cors'
import { Server, Socket } from 'socket.io';

const app = express();
const port = 8080;

app.use(cors());

const server = app.listen(port, () => {
    console.log(`'Server is running on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const CHAT_BOT = 'ChatBot';
let chatRoom = ''; 
let allUsers = []; // All users in current chat room

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        // Data sent from client when join_room event emitted
        const { username, roomSelect } = data; 
        // Join the user to a socket room
        socket.join(roomSelect); 
        let __createdtime__ = Date.now(); // Current timestamp


        // Send message to all users currently in the room.
        socket.to(roomSelect).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });
        
        // Emiting the Welcome message to the user.
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // User tracking
        allUsers.push({ id: socket.id, username, room: roomSelect });
        let chatRoomUsers = allUsers.filter((user) => user.room === roomSelect);
        socket.to(roomSelect).emit('chatroom_users', chatRoomUsers);
        
        // Emit the list of users in the room.
        socket.emit('chatroom_users', chatRoomUsers);
         
        // listening for the event when the user disconnect.
        socket.on('disconnect', () => {
            socket.to(roomSelect).emit('receive_message', {
                message: `${username} has left the chat room`,
                username: CHAT_BOT,
                __createdtime__: Date.now(),
            });
        });

        // Remove user on disconnect
        socket.on('disconnect', () => {
            allUsers = allUsers.filter((u) => u.id !== socket.id);
            const updated = allUsers.filter((user) => user.room === roomSelect);
            socket.to(roomSelect).emit('chatroom_users', updated);
        });


        // Listening for new messages.
        socket.on('send_message', (data) => {
            // Broadcasting the message to everyone in the room.
            socket.to(roomSelect).emit('receive_message', {
                message: `${data.message}`,
                username: data.username,
                __createdtime__: data.__createdtime__,
            });
            // Broadcasting the message to the sender.
            socket.emit('receive_message', {
                message: `${data.message}`,
                username: data.username,
                __createdtime__: data.__createdtime__,
            });
        });
    });

});

