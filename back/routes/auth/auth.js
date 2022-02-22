const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');

const router = express.Router();
const connection = require('../../helpers/db');

router.post('/signup', function (req, res, next) {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    connection.query({
        sql: 'INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)',
        values: [req.body.email, passwordHash, req.body.firstName, req.body.lastName],
    }, function (error, results, fields) {
        if (error)
            res.status(500).json({ flash: error.message });
        else
            res.status(200).json({ flash: "User has been signed up !" });
    });
});

router.post('/signin', function (req, res) {
    passport.authenticate('local', (error, user, info) => {
        if (error) return res.status(500).json({ flash: error.message });
        if (!user) return res.status(400).json({ flash: info.message });
        return res.json({ user: user });
    })(req, res);
});

module.exports = router;
