const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/db_nodejs_lab';

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// thiết lập user giả định
app.use((req, res, next) => {
    User.findById('6194e820dacdc3615785381b')
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: 'Duy Duy',
                    email: 'duyduy@gmail.com',
                    cart: {
                        items: [],
                    },
                });
                user.save();
            }
        });
        app.listen(3000, () => {
            console.log('CONNECTED!');
        });
    })
    .catch((err) => {
        console.log(err);
    });
