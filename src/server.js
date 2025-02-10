const express  = require('express');
const app = express();

const mongoose = require('mongoose');
const Note = require('./models/Note')

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
 
mongoose.connect('mongodb+srv://sonavs2013:Sona%40123@cluster0.h1m36.mongodb.net/notesdb').then(function(){
    app.get('/', function(req, res){
        res.send('This is the home page');
        });

        const noteRoute = require('./routes/Note');
        app.use('/notes',noteRoute);
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});