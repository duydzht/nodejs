const express = require('express');
const path = require('path');
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
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3001);