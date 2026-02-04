import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';
const Addnote = (props) => {
     const context = useContext(NoteContext);
  const {addNote } = context;
  const {showAlert} = props;

  const [note, setNote] = React.useState({title:"", description:"", tag:""});

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    showAlert("Note added successfully", "success");
  }
    const onChange = (e)=>{ 
      setNote({...note,[e.target.name]:e.target.value})
    }

    
  return (
  <>
    <div className="container my-3">
        <h1>Add  notes here</h1>
        <form className='my-3'>
            <div className="form-group my-2">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} placeholder="Enter title" />
            
            </div>
            <div className="form-group my-2">
              <label htmlFor="description">Description   </label>
              <input type="text" className="form-control" name="description" id="description" minLength={5} placeholder="Enter description" onChange={onChange} />
            </div>
            <div className="form-group  my-2">
              <label htmlFor="tag">Tag</label>
              <input type="text" className="form-control" name="tag" id="tag" placeholder="Enter tag" onChange={onChange} />
            </div>
            <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
      </div>
  </>
  )
}

export default Addnote
