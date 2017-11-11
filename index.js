require('./server/db');

const http = require('http');

const app = require('./server');

const server = http.createServer(app);

server.listen(8080, () => console.log('Server running in port 8080'));
