const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // আপনার ডেটার সোর্স
const middlewares = jsonServer.defaults();

server.use(cors()); // CORS এনাবল
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 4000; // Render-এ PORT ব্যবহার করা বাধ্যতামূলক
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
