// Task 3: plain server using Node's built-in http module.
const http = require("http");

const PORT = process.env.PORT || 3000;

// The callback runs once for every incoming request.
// req = information about the request, res = what we send back.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello");
});

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
