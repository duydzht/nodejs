const express = require('express');
// const bodyParser = require('body-parser');


const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');


app.use(express.urlencoded({
    extended: false,
}));

//? Middleware sẽ chạy từ trên xuống dưới thông qua hàm next()

//? Phân luồng về /admin
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3001);