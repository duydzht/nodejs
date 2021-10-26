const fs = require('fs');


const requireHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>')
        return res.end();
        //?  khi form được submit, action chạy, link thay đổi, điều kiện if sai, phần bên dưới sẽ chạy
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My Fisrt page</title></head>');
    res.write('<body><h1>Hello from my Node.JS Server</h1></body>');
    res.write('</html>')
    res.end();
};

// module.exports = requireHandler;

// module.exports = {
//     handler: requireHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requireHandler;
// module.exports.someText = 'Some hard coded text'

exports.handler = requireHandler;
exports.someText = 'Some hard coded text';