const express = require("express");
const app = express();
const http = require("http").Server(app);
const socketService = require("./server");

socketService.init();

const ip = "localhost";
const port = 3000;

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/on", (req, res) => {
  socketService.sendOn().then(serRes => {
    console.log("serRes ",serRes);
    res.send(serRes);
  }).catch(e => {
    res.status(500).send(e.message);
  });
});

app.get("/off", (req, res) => {
  socketService.sendOff().then(serRes => {
    res.send(serRes);
  }).catch(e => {
    res.status(500).send(e.message);
  });
});

app.get("/getData", (req, res) => {
  socketService.getData().then(serRes => {
    res.send(serRes);
  }).catch(e => {
    res.status(500).send(e.message);
  });
});