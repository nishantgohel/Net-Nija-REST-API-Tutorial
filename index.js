const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');

//set up express app
const app = express();


// connect to mongodb with ninjago as database name
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;


//set up static files
app.use(express.static('./public'));


//initialize bodyParser
app.use(bodyParser.json());

//initialize routes
app.use('/api',routes);


// error handling middleware
app.use(function(err, req, res, next){
    console.log(err);                              // to see properties of message in our console
    res.status(422).send({error: err.message});
});

//Listen for request
app.listen(3000, function(){
    console.log("Listening to port 3000");
});