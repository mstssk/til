const soc = new WebSocket("wss://localhost:8787/ws");
soc.onmessage = (event) => {
  console.log("Message from server: " + event.data);
};
soc.onclose = () => {
  console.log("Connection closed");
};
soc.onopen = () => {
  console.log("Connection opened");
  soc.send("Hello from client!");
};
