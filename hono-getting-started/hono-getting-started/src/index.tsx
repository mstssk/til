/* eslint-env node */
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { upgradeWebSocket } from "hono/cloudflare-workers";

const app = new Hono();

app.use(
  "/admin/*",
  basicAuth({
    username: "admin",
    password: "secret",
  })
);

app.get("/admin", (c) => {
  return c.text("You are authorized!");
});

// ローカルだとWebsocket動かんけど、cloudflare-workersにデプロイしないと多分ダメなやつ。
app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/hello", (c) => {
  return c.json({
    ok: true,
    message: "Hello Hono!",
  });
});

app.get("/posts/:id", (c) => {
  const page = c.req.query("page");
  const id = c.req.param("id");
  c.header("X-Message", "Hi!");
  return c.text(`You want to see ${page} of ${id}`);
});

app.post("/posts", (c) => c.text("Created!", 201));
app.delete("/posts/:id", (c) => c.text(`${c.req.param("id")} is deleted!`));

const View = () => {
  const js = `
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
`;
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
        <script dangerouslySetInnerHTML={{ __html: js }} />
      </body>
    </html>
  );
};

app.get("/page", (c) => {
  return c.html(<View />);
});

app.get("/greeting", () => {
  return new Response("Good morning!");
});

export default app;
