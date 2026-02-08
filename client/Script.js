const root = document.getElementById("messageArea");

async function connectSocket() {
    return new Promise((resolve, reject) => {
        const socket = io("http://localhost:8080");

        socket.on("connect", () => {
            console.log("✅ Connected to server");
            resolve(socket);
        });

        socket.on("connect_error", (err) => {
            reject(err);
        });
    });
}

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const roomSelect = urlParams.get('roomSelect');

if (!roomSelect || !username) {
    alert("Room and username required");
}


(async () => {
    try {
        const socket = await connectSocket();
        socket.emit("join_room", { username, roomSelect });

        socket.on('chatroom_users', (data) => {
            const usersList = document.getElementById("chatroomUsers");
            usersList.innerHTML = "";
            data.forEach(user => {
                const userElement = document.createElement("li");
                userElement.className = "bg-slate-700 px-3 py-2 rounded";
                userElement.innerText = user.username;
                usersList.appendChild(userElement);
            });
        });

        socket.on('receive_message', (data) => {
            const messageWrapper = document.createElement("div");
            messageWrapper.className = "flex items-start gap-3";

            const messageBox = document.createElement("div");
            messageBox.className = "bg-slate-700 p-3 rounded-lg max-w-xs";

            const usernameElement = document.createElement("p");
            usernameElement.className = "text-sm font-semibold";
            usernameElement.innerText = data.username;

            const messageElement = document.createElement("p");
            messageElement.className = "text-sm";
            messageElement.innerText = data.message;

            messageBox.appendChild(usernameElement);
            messageBox.appendChild(messageElement);
            messageWrapper.appendChild(messageBox);
            root.appendChild(messageWrapper);
        });

        const messageInput = document.getElementById("messageInput");
        let message = "";
        messageInput.addEventListener("input", (e) => {
            message = e.target.value;
        });

        document.getElementById("sendBtn").addEventListener("click", () => {
            socket.emit('send_message', {
                message: `${message}`,
                username: username,
                __createdtime__: Date.now(),
            });
            messageInput.value = "";
        });

        document.getElementById("lvBtn").addEventListener("click", () => {
            socket.disconnect();
            window.location.href = "/client/home.html";
        });

    } catch (err) {
        console.error("Connection failed:", err);
    }
})();



