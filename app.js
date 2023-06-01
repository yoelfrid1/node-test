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


// function callCommandBySocket(command, res) {
//   io.on("connect", () => {
//     console.log("Connected to server1111111");
//     io.emit("request", command);
//   });


//   io.on("response", (response) => {
//     console.log("Received response:", response);
//     res.send(response);
//     io.disconnect();
//   });


//   io.on("error", (error) => {
//     console.error("Error:", error.message);
//     res.status(500).send("Error: " + error.message);
//     io.disconnect();
//   })
// }