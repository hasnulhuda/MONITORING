const broker = "wss://broker.hivemq.com:8884/mqtt";

const client = mqtt.connect(broker, {
    clientId: "dashboard-" + Math.random().toString(16).substr(2, 8),
    keepalive: 60
});

const statusEl = document.getElementById("status");

client.on("connect", () => {
    console.log("MQTT CONNECTED");
    statusEl.textContent = "Online";
    statusEl.className = "status online";

    client.subscribe("sensor/esp32/#"); // 🔥 SUBSCRIBE SEMUA
});

client.on("message", (topic, message) => {
    const data = message.toString();
    console.log(topic, data); // DEBUG WAJIB

    if (topic === "sensor/esp32/temperature") {
        document.getElementById("temperature").innerText = data;
    }

    if (topic === "sensor/esp32/humidity") {
        document.getElementById("humidity").innerText = data;
    }

    if (topic === "sensor/esp32/soil/analog") {
        document.getElementById("soilAnalog").innerText = data;
    }

    if (topic === "sensor/esp32/soil/digital") {
        document.getElementById("soilDigital").innerText = data;
    }
});

client.on("error", (err) => {
    console.error("MQTT ERROR", err);
});
