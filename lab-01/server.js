// Tasks 4-7: the same server rewritten with Express.
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Task 7 helper: log method, path and status code of every request
// once the response has been sent.
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
});

// GET / : welcome text
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my Express server!");
});

// GET /about : JSON with name and section
app.get("/about", (req, res) => {
  res.status(200).json({
    name: "MANDIPALLI VINAY ESHWAR REDDY",
    section: "CSE-GEN-AI 2B 111"
  });
});

// GET /time : current date and time
app.get("/time", (req, res) => {
  res.status(200).json({ time: new Date().toString() });
});

// Task 6: runs only if no route above matched -> 404
app.use((req, res) => {
  res.status(404).send("404 Not Found: this route does not exist");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
