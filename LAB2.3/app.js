const http = require('http');
const express = require('express');


const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next(); //! cho phép req tiếp tục gửi đến middleware tiếp theo
});

//? Middleware sẽ chạy từ trên xuống dưới thông qua hàm next()

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>hello from Nodejs</h1>')
});


const server = http.createServer(app)

server.listen(3001);