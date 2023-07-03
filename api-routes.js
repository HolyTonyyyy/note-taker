const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

const db = require("./db.json")

router.get('/notes' , (req, res) => {
    res.json(db)
})

router.post('/notes', async (req, res) => {
    // const dbJson = await JSON.parse(fs.readFileSync("db.json"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    db.push(newFeedback);
    fs.writeFileSync("db.json",JSON.stringify(newFeedback));
    res.json(db);
})

module.exports = router