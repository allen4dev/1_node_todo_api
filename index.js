const http = require('http');

const server = http.createServer((req, res) => {
  res.write('My first Nodejs project');
  res.end();
});

server.listen(8080, () => console.log('Server running in port 8080'));
