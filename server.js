const coap = require('coap')
const server = coap.createServer()

server.on('request', function(req, res) {
  switch(req.url.path) {
    case '/sensors/temperature':
      handleTemperatureRequest(req, res);
      break;
    case '/sensors/humidity':
      handleHumidityRequest(req, res);
      break;
    default:
      res.code = '4.04';
      res.end('Unsupported resource');
  }
});

function handleTemperatureRequest(req, res) {
  console.log('received temperature data:', req.payload)
  res.end('temperature data received')
}

function handleHumidityRequest(req, res) {
  console.log('received humidity data:', req.payload)
  res.end('humidity data received')
}

server.listen(function() {
  console.log('server started')
})