const http = require('http');
const express = require('express');


const app = express();


//? Middleware sẽ chạy từ trên xuống dưới thông qua hàm next()
app.use('/', (req, res, next) => {
    console.log('this alway run!');
    next();
});


app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>The "add product" page!</h1>')
});

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>hello from Nodejs</h1>')
});


const server = http.createServer(app)

server.listen(3001);