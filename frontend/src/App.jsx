import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { CreatePage } from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

function App() {
    return (
        
        <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/create" element={<CreatePage />} />
         <Route path="/api/notes/:id" element={<NoteDetailPage />} /> 
        </Routes>
        
    )
}
export default App;