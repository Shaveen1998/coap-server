const coap = require('coap');
const mysql = require('mysql2');

const server = coap.createServer({ type: 'udp4' });

// Connect to the SQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coaptest'
});

server.on('request', function(req, res) {
  if (req.url === '/something/something') {

    //print the data 
    console.log('Received data:', req.payload.toString());
    
    // Insert the received data into the SQL database
    connection.query(
      'INSERT INTO waterusage (consumption) VALUES (?)',
      [req.payload.toString()],
      function(error, results, fields) {
        if (error) {
          console.error(error);
          res.statusCode = '5.00';
          res.end();
          return;
        }
        // Send a response with the received data
        res.end(req.payload);
      }
    );
  } else {
    // Respond with a "404 Not Found" if the request doesn't match the path
    res.statusCode = '4.04';
    res.end();
  }
});

server.listen(5683, '127.0.0.1', function() {
  console.log('CoAP server started');
});
