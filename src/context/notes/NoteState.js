import  { useState } from "react"
import NoteContext from "./noteContext";

const NoteState = (props) => {
const host = "http://localhost:5000";
const token = localStorage.getItem('token');
const notesInitial = [];
const[notes, setNotes] = useState(notesInitial);

// Add a note
const addNote = async (title, description, tag) => {
  console.log("Adding a new note");

  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ title, description, tag }),
  });

  const json = await response.json();

  // handle validation error
  if (!response.ok) {
    console.error(json.errors);
    return;
  }

  // ✅ USE BACKEND NOTE (real _id)
  setNotes((prevNotes) => prevNotes.concat(json));
};


// Delete a note
const deleteNote = async (id) => {
   console.log("Deleting the note with id:", id);
    console.log("Fetching all notes");

  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "auth-token":   token
  },
});
const json = await response.json();
console.log(json);

   setNotes(notes.filter(note => note._id !== id));
} 
// Edit a note
const editNote = async (id, title, description, tag) => {
// API call would go here

  console.log("Editing the note with id:", id); 
  const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "auth-token":   token
  },
  body: JSON.stringify({ title, description, tag }),
});
const json = await response.json();
console.log(json);
  // Logic to edit in client side

  setNotes(notes.map(note => {
    if (note._id === id) {
      return { ...note, title, description, tag };
    }
    return note;
  }));
} 
// Get all notes  
const getNotes = async () => {
  console.log("Fetching all notes");

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "auth-token":   token
  },
});
const json = await response.json();
console.log(json);
    setNotes(json);
}


   return (
      <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
         {props.children}
      </NoteContext.Provider>
   )
}
export default NoteState;