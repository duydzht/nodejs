const path = require('path');
const express = require('express');

const app = express();
// const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database')


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
})