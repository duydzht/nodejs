const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');



app.set('view engine', 'ejs'); //! sử dụng pug, handlebars
app.set('views', 'views'); //! nơi để sử dụng nó

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public'))); //! lấy path cứng đến public

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3001);