const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');
// get all the notes
router.get("/fetchallnotes", fetchuser , async (req, res) => {
try {
    const notes = await Note.find({user : req.user.id})
    res.json(notes);
}  catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }

});

// Add new notes
router.post("/addnote", fetchuser , [
  body('title',"Please enter title").isLength({ min: 3 }),
  body('description',"Please enter description").isLength({min:5}),
],  async (req, res) => {

  try {
    console.log("test");
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       const { title, description, tag } = req.body;
        const notes = new Note({
          title, description,tag,user:req.user.id
        })
        const savedNotes = await notes.save();
        res.json(savedNotes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
 
});

// Update  notes
router.put("/updatenote/:id", fetchuser , async (req, res) => {
const{title,description,tag } = req.body;
  const newNote={}
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    // Find the note to be updated

    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("not found");
    }

    if(note.user.toString()!== req.user.id){
      return res.status(401).send("Not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
    res.json({note}) 

});

// Update  notes
router.delete("/deletenote/:id", fetchuser , async (req, res) => {
    // Find the note to be delete
try {
  let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("not found");
    }

    if(note.user.toString()!== req.user.id){
      return res.status(401).send("Not allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"status":"Note deleted"}) 
} catch (error) {
  console.error(error.message);
  res.status(500).send("Server Error"); 
}
    

});


module.exports = router