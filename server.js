//imports modules
const express = require("express");
const path = require("path");

//creates express instance, sets port
const app = express();
const PORT = process.env.PORT || 5001;
const notesRoutes = require("./routes/notesRoutes");

//handles static files from public directory
app.use(express.static("./public"));

//setting routes, struggled the most on what seems the easiest
app.use("/api/notes", notesRoutes);
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//start
app.listen(PORT, () => {
  console.log("Server listening on localhost:5001");
});
