const Net = require("net");

const serverObj = {
  port: 80,
  socket: null,
  init:  () => {
    const server = new Net.Server();
    server.listen(this.port, () => {
      console.log(
        `Server listening for connection requests on socket localhost:${this.port}`
      );
    });

    server.on("connection", (socket) => {
      console.log("A new connection has been established.");
      this.socket = socket;
      socket.on("data",  (data) =>{
        console.log(`Data received from client: ${data.toString()}`);
      });

      socket.on("end",  () => {
        console.log("Closing connection with the client");
        this.socket = null;
      });

      socket.on("error",  (err) => {
        console.log(`Error: ${err}`);
      });
    });
  },
  sendOn: () => {
    return new Promise((res, rej) => {
      if (!this.socket) {
        rej(new Error("no connection with car server"));
      }
      this.socket.once("data", (data) => {
        if (data) {
          res(data.toString());

        } else {
          rej(new Error("server rejected request"));
        }
      });
      this.socket.write("68 07 07 68 73 FD 51 01 FD 1A 01 DA 16");
    });
  },

  sendOff: () => {
    return new Promise((res, rej) => {
      if (!this.socket) {
        rej(new Error("no connection with car server"));
      }
      this.socket.once("data", (data) => {
        if (data) {
          res(data.toString());
        } else {
          rej(new Error("server rejected request"));
        }
      });
      this.socket.write("68 07 07 68 73 FD 51 01 FD 1A 00 D9 16");
    });
  },
  getData: () => {
    return new Promise((res, rej) => {
      if (!this.socket) {
        rej(new Error("no connection with car server"));
      }
      this.socket.once("data", (data) => {
        if (data) {
          res(data.toString());
        } else {
          rej(new Error("server rejected request"));
        }
      });
      this.socket.write("10 7B 00 7B 16");
    });
  },
};

module.exports = serverObj;
