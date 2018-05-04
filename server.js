const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hi :)');
});

app.get('/product/:id', function (req, res) {
  const product = req.params.id;

  const data = {
    timestamp: Date.now(),
    payload: { product }
  };

  io.emit('product provisioned', data);
  res.send(data);
});

io.on('connection', function (client) {
  client.on('event', function (data) { });
  client.on('disconnect', function () { });
});

server.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}...`);
});

module.exports = server;
