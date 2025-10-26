import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { formatDate } from '../utilis'
import api from "../api";
import { Link } from "react-router";
function NoteCard({note, setNotes}) {
    const createdAt = note.createdAt ? new Date(note.createdAt) : null;
    const handleDelete = async (e, id) => {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this note?")) return;

      try {
        await api.delete(`/api/notes/${id}`)
        setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
        toast.success("Note deleted successfully");
      } catch (error) {
        console.error(error)
      }
    }
    return(
    <Link 
      to={`/api/notes/${note._id}`}
      className="ml-5 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          
        
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{note.content}</p>
       <div className="flex items-center justify-between">
          {createdAt && (
            <p className="dark:text-white text-sm italic">
              {formatDate(createdAt)}
            </p>
          )}
        <div className="flex items-center gap-3">
             <FaPen color="white" size="1.5em"/>
            <button
             className="cursor-pointer"
             onClick={(e) => handleDelete(e, note._id)}>
             <MdDelete color="red" size="2em"/>
             </button>
        </div>
       
        </div>
        
        
    </Link>
    )
}

export default NoteCard;
