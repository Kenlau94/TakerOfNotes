const router = require("express").Router();
const path = require("path");

// final code for html????????????????????
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

module.exports = router;
