//imports
const express = require("express");
const path = require("path");
const fsPromises = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const notesData = require("../db/db.json");

// handling routers get, post, delete
const router = express.Router();
router.use(express.json());
router.get("/", (req, res) => {
  res.json(notesData);
});

router.post("/", async (req, res) => {
  req.body.id = uuidv4();
  notesData.push(req.body);
  const dbFilePath = path.join(__dirname, "../db/db.json");
  try {
    await fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2));
    res.status(201).json(req.body);
    console.log(notesData);
  } catch (error) {
    console.log("Error writing to mock db.json");
    res.status(500).json({ error: "Error; Note was not written to db.json" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const noteToDelete = notesData.findIndex((note) => note.id === id);
  if (noteToDelete === -1) {
    return res.status(404).json({ error: "Note with id not found" });
  }
  notesData.splice(noteToDelete, 1);
  const dbFilePath = path.resolve("db", "db.json");

  try {
    await fsPromises.writeFile(dbFilePath, JSON.stringify(notesData, null, 2));
    res.status(204).json(notesData);
    console.log(notesData);
  } catch {
    console.log("Error deleting note from mock db.json");
    res.status(500).json({ error: "Error; Note was not written to db.json" });
  }
});
module.exports = router;
