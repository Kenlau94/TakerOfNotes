const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;
const notesRoutes = require("./routes/notesRoutes");
app.use(express.static("./public"));
app.use("/api/notes", notesRoutes);
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(PORT, () => {
  console.log("Server listening on localhost:5001");
});
