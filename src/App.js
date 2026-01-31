import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <BrowserRouter>
    <NoteState>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
      
    </NoteState>
    </BrowserRouter>
    
  );
}

export default App;
