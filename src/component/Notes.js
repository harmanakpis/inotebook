import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();

  const { notes, getNotes ,editNote} = context;
  const {showAlert} = props;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    } else{
      props.showAlert("Please login to access your notes", "warning");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = React.useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const updateNote = (currentNote) => {
    console.log("Updating the note", currentNote);
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const updateNoteHandler = (note) => {
    console.log("Updating the note to:", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert("Note updated successfully", "success");
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="etitle"
                    id="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Enter title" minLength={5}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="description">Description </label>
                  <input
                    type="text"
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    placeholder="Enter description" minLength={5}
                  />
                </div>
                <div className="form-group  my-2">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    name="etag"
                    id="etag"
                    value={note.etag}
                    onChange={onChange}
                    placeholder="Enter tag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"  ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button" disabled={note.etitle.length<5 || note.edescription.length<5}
                className="btn btn-primary"
                onClick={() => updateNoteHandler(note)}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
