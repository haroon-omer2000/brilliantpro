const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

let bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var mongoDB = 'mongodb://localhost:27017/Web-Project';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.post('/register_user', function (req, res) {
    var user = req.body;
    user["role"] = "student"
    db.collection("Users").insertOne(user);
    res.send({message:"registered"});
});

app.post('/login_user', function (req, res) {
    db.collection("Users").findOne({email: req.body.email, password: req.body.password}).then( (user) => {
         if (user)
             res.send({message: "logged_in", user: user.email, role: user.role})
         else
            res.send({message: "INVALID_CREDENTIALS", user: "", role: ""});
    }).catch((err) => {
        res.send({message: err, user: "", role: ""});
    })
});

app.get('/courses', function (req, res) {
    let courses = [];
    const cursor = db.collection('Courses').find({});
    cursor.forEach( function (vehicle) { 
        courses.push(vehicle)
    }).then( (data) => {
        res.send({courses: courses});
    });
});

app.post('/add_course', function (req, res) {
    db.collection("Quizzes").insertOne(req.body);
    res.send({message:"ok"})
});

app.get('/courses/:id', function (req, res) {
    db.collection("Courses").findOne({_id: new ObjectId(req.params.id)}).then( (course) => {
        res.send({course: course})
    })
});

app.put('/courses/:id', function (req, res) {
    db.collection("Courses").updateOne({_id: new ObjectId(req.params.id)},{$set:req.body})
    .then(     
        res.send({message:"Successful updation"})
    )
    .catch( (err) => {
        res.send({message:"Unsuccessful updation"})
    });
});

app.get('/courses/:id/Quizzes', function (req, res) {
    let quizzes = [];
    db.collection("Courses").findOne({_id: new ObjectId(req.params.id)}).then( (course) => {
        if (course.quizzes){
            course.quizzes.forEach( function(quiz) {
                db.collection("Quizzes").findOne({_id: quiz}).then((quiz)=>{
                    quizzes.push(quiz);
                    if (quizzes.length ==  course.quizzes.length)
                        res.send({quizzes: quizzes});
                })
            });
        } else {
            res.send({quizzes: []})
        }       
    });
});

app.get('/courses/:course_id/Quizzes/:id', function (req, res) {
    db.collection("Quizzes").findOne({_id: new ObjectId(req.params.id)}).then( (quiz) => {
        res.send({quiz: quiz})
    })
});

app.post('/courses/:id/Quizzes/new', function (req, res) {
    console.log(req.body,req.params.id);
    db.collection("Quizzes").insertOne(req.body, function (err){
        if (err) 
            res.send({message: "UNSUCCESSFUL"})
        else {
            db.collection("Courses").findOneAndUpdate(
                { _id: new ObjectId(req.params.id)}, 
                { $push: { quizzes: new ObjectId(req.body._id) } }
            ).then((data)=>{
                res.send({message: "ok"})
            })
        }
    });
   
});

app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

