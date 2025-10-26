import { FaArrowLeft } from "react-icons/fa6";
import { Link,useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api.js";

export const CreatePage = () => {
  const [title, setTitle ] = useState("")
  const [content, setContent ] = useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }
    try {
      await api.post("/api/notes",{title, content});
      toast.success("Note created successfully!")
      setTitle("")
      setContent("")
      navigate("/")
    } catch (error) {
      console.error(error);
      toast.error("Failed to create note");
    }

  };

  return (
    <>
        <Link to="/" className="flex items-center ml-4 cursor-pointer">
        <FaArrowLeft size="2em"/>
        <h1 className="text-lg">Back to Notes</h1>
        </Link>
    <div className="flex items-center flex-col justify-start h-max gap-2">
      
    <div className="h-2xl w-2xl">
        
        <div className="m-4">
         <h1 className="text-2xl">Create New Note</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-3">
          <label className="text-0.5xl">Title</label>
          <input 
              type="text" 
              className="rounded-md text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
        </div>
        
        <div className="flex flex-col">
        <label className="text-0.5xl">content</label>
        <textarea 
                type="text" 
                className="rounded-md text-black"
                value={content}
                onChange={(e) => setContent(e.target.value)}/>
        </div>
        <button type="submit" className="bg-green-400 rounded-sm w-40 h-10 text-1.5xl mt-5 text-center cursor-pointer">Create note</button>
        </form>

        
    </div>
    </div>
    </>
  )
}
