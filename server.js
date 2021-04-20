const express = require("express");
const data = [0, 1, 2, 3, 4, 5];

const server = express();

server.get("/", (req, res, next) => {
  res.status(200).json({ api: "running" });
});

server.get("/api", (req, res, next) => {
  console.log(data);
  res.status(200).json(data);
});

server.post("/api", (req, res, next) => {
  data.push(6);
  res.status(201).json(data);
});

server.delete("/api", (req, res, next) => {
  data.pop();
  res.status(201).json(data);
});

module.exports = server;
