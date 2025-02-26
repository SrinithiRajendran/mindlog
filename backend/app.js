const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hi from server");
});

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

// View all notes
app.get("/notes", (req, res) => {
  const sqlQuery =
    "SELECT id, title, description, emotional_state, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM notes;";

  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

//view single note

app.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const sqlQuery =
    "SELECT id,title,description,emotional_state,DATE_FORMAT(date,'%Y-%m-%d') AS date FROM notes WHERE id=?;";
  db.query(sqlQuery, [noteId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "Note not found" });
    return res.json(data[0]);
  });
});

// Create a new note
app.post("/notes", (req, res) => {
  const sqlQuery =
    "INSERT INTO notes (`title`, `description`, `emotional_state`, `date`) VALUES (?, ?, ?, ?)";
  const formattedDate = new Date(req.body.date).toISOString().split("T")[0];
  const values = [
    req.body.title,
    req.body.description,
    req.body.emotional_state,
    formattedDate,
  ];

  db.query(sqlQuery, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Note has been created successfully" });
  });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const sqlQuery = "DELETE FROM notes WHERE id = ?";

  db.query(sqlQuery, [noteId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Note has been deleted successfully" });
  });
});

// Update a note
app.put("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const sqlQuery =
    "UPDATE notes SET `title` = ?, `description` = ?, `emotional_state` = ?, `date` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.emotional_state,
    req.body.date,
  ];

  db.query(sqlQuery, [...values, noteId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Note has been updated successfully" });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
