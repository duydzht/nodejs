const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');



app.set('view engine', 'ejs'); //! sử dụng pug, handlebars
app.set('views', 'views'); //! nơi để sử dụng nó

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); //! lấy path cứng đến public

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3001, () => {
    console.log('Running at port 3001');
});