const express = require('express');
var route = express.Router();
const Note = require('../models/Note');
route.get('/list/:userid',async function(req, res){
    var notes = await Note.find({userid: req.params.userid});
    res.json(notes);
});

route.post('/add', async function(req, res){
    const newNote = new Note({id: req.body.id, userid: req.body.userid, title: req.body.title, content: req.body.content});
    await newNote.save();
    const response = {
        message: `New note created with id: ${req.body.id}`
    };
    res.json(response);
});

route.put('/update', async function(req, res){
    console.log(req.body);
    var updateNote = await Note.findOneAndUpdate(
        {id : req.body.id},
    {title: req.body.title,content: req.body.content}, 
    {new:true} // Return the updated data
);
const response = {message: `Note is updated for user: ${req.body.id} \n updated note: ${updateNote}`};
res.json(response);
});

route.delete('/delete', async function(req, res) {
    var deleteNote = await Note.deleteOne({id:req.body.id});
    const response = {message: `Note has been deleted with id: ${req.body.id}`, note: deleteNote};
    res.json(response);
    
})
module.exports=route;