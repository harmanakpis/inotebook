import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{note.title}</h5>

            <div>
              <i
                className="fa-solid fa-trash-can mx-2"
                role="button"
                onClick={() => deleteNote(note._id)}
              ></i>

              <i
                className="fa-solid fa-pen-to-square mx-2"
                role="button" onClick={() => {updateNote(note)}}
              ></i>
            </div>
          </div>

          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
