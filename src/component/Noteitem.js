import React from 'react'

const Noteitem = (props) => {
    const {note} = props;
  return (
    <div className='col-md-3'>
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
            </div>
         </div>
      <h3></h3>
      <p></p>
    </div>
  )
}

export default Noteitem
