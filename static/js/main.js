console.log("Laptop B Live Page Loaded");

/* =========================
   LIVE CLOCK
========================= */

function updateClock() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").textContent = currentTime;
}

updateClock();
setInterval(updateClock, 1000);


/* =========================
   WEBSOCKET CONNECTION
========================= */

const latestMessage =
document.getElementById("latest-message");

const receivedTime =
document.getElementById("received-time");

const connectionStatus =
document.getElementById("connection-status");


const protocol =
window.location.protocol === "https:"
? "wss://"
: "ws://";

const socket =
new WebSocket(
    protocol +
    window.location.host +
    "/ws/signals/"
);


socket.onopen = () => {

    console.log("WebSocket Connected");

    if (connectionStatus) {

        connectionStatus.textContent =
        "Connected";

    }
};


socket.onmessage = (event) => {

    console.log("Message Received:",
    event.data);

    const data =
    JSON.parse(event.data);

    latestMessage.textContent =
    data.message;

    receivedTime.textContent =
    new Date(data.time)
    .toLocaleTimeString();
};


socket.onclose = () => {

    console.log("WebSocket Disconnected");

    if (connectionStatus) {

        connectionStatus.textContent =
        "Disconnected";

    }
};


socket.onerror = (error) => {

    console.log("WebSocket Error:",
    error);

};


/* =========================
   TEST MESSAGE
   REMOVE LATER
========================= */

// setTimeout(() => {

//     latestMessage.textContent =
//     "HELP";

//     receivedTime.textContent =
//     new Date().toLocaleTimeString();

// }, 3000);