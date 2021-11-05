const http = require("http");
const path = require("path");
const app = require(path.join(__dirname, "./app"));

const port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  console.log(`Listening on port ${port}`);
});

server.listen(port);
