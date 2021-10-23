const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My Fisrt page</title></head>');
    res.write('<body><h1>Hello from my Node.JS Server</h1></body>');
    res.write('</html>')
    res.end();
})

server.listen(3001)