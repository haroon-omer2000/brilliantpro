const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());


let bodyParser = require('body-parser');
var mongoose = require('mongoose');
  
var mongoDB = 'mongodb://localhost:27017/web-class';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.get('/test', function (req, res) {
    console.log('Recieved')
    res.send({response:"successx"});
});

app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

