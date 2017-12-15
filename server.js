const express = require('express');
const app = express();
const server = require('http').Server(app);

server.listen(process.env.PORT || 1234, function () {
  console.log("Server started");
});

app.use(express.static("static"));
