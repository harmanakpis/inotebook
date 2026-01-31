import react, { useState } from "react"
import NoteContext from "./noteContext";

const NoteState = (props) => {
const notesInitial = [
  {
    "_id": "6979a58b88a65c215d3b6af1",
    "user": "6974bad09abfc071a7a24eae",
    "title": "My Note",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-01-28T05:58:35.523Z",
    "__v": 0
  },
  {
    "_id": "6979a5f9ec38b73b4b2e5eb1",
    "user": "6974bad09abfc071a7a24eae",
    "title": "My Note update",
    "description": "Please access the video update",
    "tag": "personal",
    "date": "2026-01-28T06:00:25.742Z",
    "__v": 0
  },
  {
    "_id": "6979a5f9ec38b73b4b2e5eb1",
    "user": "6974bad09abfc071a7a24eae",
    "title": "My Note update",
    "description": "Please access the video update",
    "tag": "personal",
    "date": "2026-01-28T06:00:25.742Z",
    "__v": 0
  },
  {
    "_id": "6979a5f9ec38b73b4b2e5eb1",
    "user": "6974bad09abfc071a7a24eae",
    "title": "My Note update",
    "description": "Please access the video update",
    "tag": "personal",
    "date": "2026-01-28T06:00:25.742Z",
    "__v": 0
  },
  {
    "_id": "6979a5f9ec38b73b4b2e5eb1",
    "user": "6974bad09abfc071a7a24eae",
    "title": "My Note update",
    "description": "Please access the video update",
    "tag": "personal",
    "date": "2026-01-28T06:00:25.742Z",
    "__v": 0
  }
];
const[notes, setNotes] = useState(notesInitial);

   return (
      <NoteContext.Provider value={{notes, setNotes}}>
         {props.children}
      </NoteContext.Provider>
   )
}
export default NoteState;