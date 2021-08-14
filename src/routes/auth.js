const express = require('express');
const router = express.Router();
const db = require('../model/db');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

router.post("/signup", (req, res) => {
    const { full_name, email, password } = req.body;
    const id = uuidv4();
    const created_at = new Date().getTime();

    const sqlCheckEmail = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheckEmail, email, (error, success) => {
        if (error) res.status(500).send(error);
        if (success.length > 0) {
            res.status(400).send({ message: "Email already registered!" });
        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    const sqlCreateUser = "INSERT INTO users (user_id, full_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)";
                    db.query(sqlCreateUser, [id, full_name, email, hash, `${created_at}`], (error, success) => {
                        if (error) res.status(500).send(error);
                        if (success) res.status(200).send(success);
                    });
                }
            });
        }
    });
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    const sqlGetUser = "SELECT * FROM users where email = ?";
    db.query(sqlGetUser, email, (error, success) => {
        if (error) res.status(500).send(error);
        if (success.length > 0) {
            bcrypt.compare(password, success[0].password, (error, response) => {
                if (error) res.status(500).send(error);
                if (response) {
                    res.status(200).send(success);
                } else {
                    res.status(400).send({ message: "Wrong email or password!" });
                }
            });
        } else {
            res.status(400).send({ message: "Email doesn't registered yet!"});
        }
    });
});

module.exports = router;