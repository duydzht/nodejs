const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
    extended: false,
}));

//? Middleware sẽ chạy từ trên xuống dưới thông qua hàm next()

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3001);