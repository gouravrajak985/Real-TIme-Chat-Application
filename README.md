# Real Time Chat Sytem

A real-time chat application built with **Node.js**, **Express.js**, and **Socket.io**, **MongoDB** featuring multi-room chat functionality with a modern web interface.

## Overview

Real Time Chat Backend is a full-stack web application that enables users to join different chat rooms and communicate in real-time with other users. The application features a clean, modern UI built with Tailwind CSS and real-time bidirectional communication using Socket.io.

## Features

✨ **Real-Time Messaging**
- Instant message delivery using WebSocket connections
- Multiple chat rooms (Frontend, Backend, DevOps, UI/UX)
- Live user list in each room

👥 **User Management**
- Join chat rooms with a username
- Real-time user presence tracking
- Automatic notifications when users join/leave
- Welcome messages from ChatBot

🎨 **Modern UI**
- Clean, responsive interface using Tailwind CSS
- Dark theme designed for comfort
- Real-time message display with usernames
- Active users sidebar

🔄 **Event-Driven Architecture**
- Real-time message broadcasting
- User presence updates
- Automatic disconnect handling

## Project Structure

```
Real Time Chat Backend/
├── client/
│   ├── home.html          # Login and room selection page
│   ├── chat.html          # Main chat interface
│   ├── Script.js          # Client-side Socket.io implementation
│   └── package.json       # Client dependencies
├── server/
│   ├── app.js            # Express and Socket.io server
│   └── package.json      # Server dependencies
└── README.md             # This file
```

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time communication library
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Development server with auto-reload
- **MongoDB** - Save the chats in Database.

### Frontend
- **HTML5** - Semantic markup
- **Vanilla JavaScript** - Client-side logic
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - WebSocket communication

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone or navigate to the project directory:**
   ```bash
   cd "Real Time Chat Backend"
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies (optional):**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Start the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   Or use the standard node command:
   ```bash
   node app.js
   ```

   The server will run on **http://localhost:8080**

### Access the Client

1. Open your browser and navigate to:
   ```
   http://localhost:8080/client/home.html
   ```

2. Enter your username and select a chat room

3. Click "Join Room" to start chatting

## Usage Guide

### Joining a Chat Room

1. **Home Page**: Enter your username and select a room from the dropdown:
   - **Frontend** - For frontend developers
   - **Backend** - For backend developers
   - **DevOps** - For DevOps engineers
   - **UI/UX** - For designers

2. **Click "Join Room"** to enter the chat

### Chat Interface

- **Left Sidebar**: Displays all active users in the current room
- **Message Area**: Shows all messages with usernames and timestamps
- **Input Field**: Type your message and click "Send" or press enter
- **Leave Room**: Click the "Leave Room" button to exit and return to home

### Features in Chat

- **System Messages**: ChatBot notifications when users join/leave
- **Real-Time Messages**: See messages instantly from all users
- **User List**: Monitor who's currently active in the room
- **Welcome Message**: Get a personalized welcome when you join


## License

ISC

## Author

Developed as a real-time chat application project.

---

**Happy Chatting! 💬**
