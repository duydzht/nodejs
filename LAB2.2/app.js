const http = require('http');
const express = require('express');


const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next(); //! cho phép req tiếp tục gửi đến middleware tiếp theo
});

app.use((req, res, next) => {
    console.log('In another middleware!');
});


const server = http.createServer(app)

server.listen(3001);