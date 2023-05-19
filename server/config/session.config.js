const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongo');

module.exports = app => {
    // Configurar la conexión con MongoDB
    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                // sameSite: 'none',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basicAuth'
            })
        })
    );
};
