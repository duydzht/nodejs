const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

const adminData = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const expHbs = require('express-handlebars')


app.engine('hbs', expHbs({
    // đổi đuôi mở rộng 
    extname: '.hbs'
}));
app.set('view engine', 'hbs'); //! sử dụng pug, handlebars
app.set('views', 'views'); //! nơi để sử dụng nó

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); //! lấy path cứng đến public

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3001);