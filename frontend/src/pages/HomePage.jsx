import { useState,useEffect } from "react";
import NavBar from "../components/NavBar"
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import api from "../api";

function HomePage() {
        const [notes, setNotes] = useState([])

        useEffect(() => {
            const getDate = async () => {
              try {
               const res = await api.get("/api/notes");
               console.log(res.data)
               setNotes(res.data)
              } catch (error) {
                console.error(error)
              }
            }
            getDate();
        }, [])
    return (
          <div className="min-h-screen">
              <NavBar />
              <div className="max-w-7xl mx-auto p-4 mt-6">
                {notes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                      <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    ))}
                  </div>
                )}
              </div>
              
          </div>
    )
}

export default HomePage;