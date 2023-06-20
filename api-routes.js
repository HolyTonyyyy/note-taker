const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");


router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db.json"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db.json",JSON.stringify(dbJson));
    res.json(dbJson);
})