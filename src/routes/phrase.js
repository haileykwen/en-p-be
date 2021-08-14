const express = require("express");
const router = express.Router();
const db = require("../model/db");
const { v4: uuidv4 } = require("uuid");

router.post("/create", (req, res) => {
    const { creator, phrase, meaning, description, example_type, example } = req.body;
    const phrase_id = uuidv4();
    const created_at = new Date().getTime();
    const sqlCreatePhrase = "INSERT INTO phrases (phrase_id, phrase, meaning, description, example_type, example, creator, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sqlCreatePhrase, [phrase_id, phrase, meaning, description, example_type, example, creator, created_at], (error, success) => {
        if (error) res.status(500).send(error);
        if (success) res.status(200).send(success);
    });
});

router.post("/myphrases", (req, res) => {
    const { creator } = req.body;
    const sqlGetMyPhrases = "SELECT * FROM phrases WHERE creator = ?";

    db.query(sqlGetMyPhrases, creator, (error, success) => {
        if (error) res.status(500).send(error);
        if (success) res.status(200).send(success);
    });
});

router.post("/view", (req, res) => {
    const { phrase_id } = req.body;
    const sqlViewPhrase = "SELECT * FROM phrases WHERE phrase_id = ?";

    db.query(sqlViewPhrase, phrase_id, (error, success) => {
        if (error) res.status(500).send(error);
        if (success) res.status(200).send(success);
    });
});

router.delete("/delete", (req, res) => {
    const { phrase_id } = req.body;
    const sqlDeletePhrase = "DELETE FROM phrases WHERE phrase_id = ?";

    db.query(sqlDeletePhrase, phrase_id, (error, success) => {
        if (error) res.status(500).send(error);
        if (success) res.status(200).send(success);
    });
});

router.put("/update", (req, res) => {
    const { phrase_id, phrase, meaning, description, example_type, example } = req.body;
    const sqlUpdatePhrase = "UPDATE phrases SET phrase = ?,  meaning = ?, description = ?, example_type = ?, example = ? WHERE phrase_id = ?";
    
    db.query(sqlUpdatePhrase, [phrase, meaning, description, example_type, example, phrase_id], (error, success) => {
        if (error) res.status(500).send(error);
        if (success) res.status(200).send(success);
    });
});

module.exports = router;