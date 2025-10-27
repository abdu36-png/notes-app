import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Note from "./models/model.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// ===== API ROUTES =====

// Create
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Read all
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(404).json({ message: "Notes not found" });
  }
});

// Read by ID ✅ FIXED
app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Note not found" });
  }
});

// ===== FRONTEND (React Build) =====
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// React Router fallback for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});



//RbNolEDT7a33Hv6k
//mongodb+srv://seidamir26_db_user:RbNolEDT7a33Hv6k@mynoteapp.v7lw26r.mongodb.net/?retryWrites=true&w=majority&appName=MyNoteapp
