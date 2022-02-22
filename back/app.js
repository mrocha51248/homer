const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const app = express();
const authRouter = require('./routes/auth/auth');
const connection = require('./helpers/db');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send("youhou");
})

app.use('/auth', authRouter);

app.get("/profile", passport.authenticate('jwt',
    { session: false }),
    function (req, res) {
        res.send(req.user);
    });

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

let server = app.listen(process.env.PORT || 3030, function () {
    console.log('Listening on port ' + server.address().port);
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, cb) {
        connection.query({
            sql: 'SELECT * FROM users WHERE email=?',
            values: [email],
        }, function (error, results, fields) {
            if (error) {
                cb(error);
                return;
            }
            if (results.length < 1 || !bcrypt.compareSync(password, results[0].password)) {
                cb(null, false, { message: "Incorrect email ou password." });
                return;
            }
            cb(null, results[0]);
        });
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        return cb(null, jwtPayload);
    }
));
