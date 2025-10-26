import express from "express";
import dotenv  from "dotenv";
import connectDB from "./config/db.js";
import Note from "./models/model.js";
import cors from "cors"

const app = express();
const PORT = 3001

connectDB()
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())

app.get('/',(req,res) => {
    res.send("wellcome to this notes")
})

//create
app.post('/api/notes', async (req,res) => {
    try {
        const { title,content } = req.body;
        const note = new Note({ title,content })
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        res.status(500).json({ message : "Internal server error"})
    }
})

//READ
app.get('/api/notes', async (req,res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (error) {
        res.status(404).send("Note not found")
    }
})

//read by id
app.get("/api/notes/:id", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//UPDATE
app.put('/api/notes/:id', async (req,res) => {
    const noteId = req.params.id
    const { title,content } = req.body

    try {
       const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        { title,content },
        {new : true}
    )
       res.json(updatedNote)
    } catch (error) {
        res.status(404).json({ message : "Note not found"})
    }
})

//DELETE
app.delete('/api/notes/:id', async (req,res) => {
    const noteId = req.params.id
    try {
        await Note.findByIdAndDelete(noteId)
        res.json({ message : "Note deleted successfully"})
    } catch (error) {
         res.status(404).json({ message : "Note not found"})
    }
})








app.listen(PORT, () => {
    console.log(`Server Is Running On PORT ${PORT}`)
})


//RbNolEDT7a33Hv6k
//mongodb+srv://seidamir26_db_user:RbNolEDT7a33Hv6k@mynoteapp.v7lw26r.mongodb.net/?retryWrites=true&w=majority&appName=MyNoteapp
