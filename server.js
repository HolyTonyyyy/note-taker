const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path")
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// app.use("/api",api_routes)
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const db = require("./db/db.json");
// renders home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
});
//render notes pages
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});
// get notes from db.json
app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", async (req, res) => {

  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  db.push(newFeedback);
  fs.writeFileSync("db.json", JSON.stringify(newFeedback));
  res.json(db);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
