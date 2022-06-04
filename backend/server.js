const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

let bodyParser = require('body-parser');
var mongoose = require('mongoose');
const { async } = require('@firebase/util');
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
             res.send({message: "logged_in", user: user.email, role: user.role, id: user._id})
         else
            res.send({message: "INVALID_CREDENTIALS", user: "", role: ""});
    }).catch((err) => {
        res.send({message: err, user: "", role: ""});
    })
});

app.get('/courses', function (req, res) {
    let courses = [];
    const cursor = db.collection('Courses').find({});
    cursor.forEach( function (course) { 
        courses.push(course)
    }).then( () => {
        res.send({courses: courses});
    });
});

app.post('/add_course', function (req, res) {
    db.collection("Courses").insertOne(req.body, function(err){
        res.send({course_id: req.body._id})
    });
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

app.put('/Courses/:id/Publish', function (req, res) {
    db.collection("Courses").updateOne({_id: new ObjectId(req.body.courseId)}, {$set: {published: true}}).then(()=> {
        res.send({message: "okxx"});
    })
   
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
    db.collection("Quizzes").insertOne(req.body, function (err){
        if (err) 
            res.send({message: "UNSUCCESSFUL"})
        else {
            db.collection("Courses").findOneAndUpdate(
                { _id: new ObjectId(req.params.id)}, 
                { $push: { quizzes: new ObjectId(req.body._id) } }
            ).then(()=>{
                res.send({course_id: req.params.id})
            })
        }
    });
});

app.get('/courses/:id/Assessments', function (req, res) {
    let assessments = [];
    db.collection("Courses").findOne({_id: new ObjectId(req.params.id)}).then( (course) => {
        if (course.assessments){
            course.assessments.forEach( function(assessment) {
                db.collection("Assessments").findOne({_id: assessment}).then((assessment)=>{
                    assessments.push(assessment);
                    if (assessments.length ==  course.assessments.length)
                        res.send({assessments: assessments});
                })
            });
        } else {
            res.send({assessments: []})
        }       
    });
});

app.post('/courses/:id/Assessments/new', function (req, res) {
    db.collection("Assessments").insertOne(req.body, function (err){
        if (err) 
            res.send({message: "UNSUCCESSFUL"})
        else {
            db.collection("Courses").findOneAndUpdate(
                { _id: new ObjectId(req.params.id)}, 
                { $push: { assessments: new ObjectId(req.body._id) } }
            ).then((data)=>{
                res.send({message: "ok"})
            })
        }
    });
});

app.get('/courses/:id/Materials', function (req, res) {
    let materials = [];
    db.collection("Courses").findOne({_id: new ObjectId(req.params.id)}).then( (course) => {
        if (course.materials){
            course.materials.forEach( function(material) {
                db.collection("Materials").findOne({_id: material}).then((material)=>{
                    materials.push(material);
                    if (materials.length ==  course.materials.length)
                        res.send({materials: materials});
                })
            });
        } else {
            res.send({materials: []})
        }       
    });
});

app.post('/courses/:id/Materials/new', function (req, res) {
    db.collection("Materials").insertOne(req.body, function (err){
        if (err) 
            res.send({message: "UNSUCCESSFUL"})
        else {
            db.collection("Courses").findOneAndUpdate(
                { _id: new ObjectId(req.params.id)}, 
                { $push: { materials: new ObjectId(req.body._id) } }
            ).then((data)=>{
                res.send({message: "ok"})
            })
        }
    });
});

app.post('/courses/:id/Payment', function (req, res) {
    var query = {};
    var update = { $push: {[`Courses.${req.body.course_id}`]: {user_id: new ObjectId(req.body.user_id), enrollment_date: req.body.enrollment_date, status: req.body.status}}};
    var options = { upsert: true };

    db.collection("Enrollments").count({}).then((count)=>{
        if (count == 0)
            db.collection("Enrollments").insertOne({});
        
        db.collection("Enrollments").updateOne(query, update, options);

        update = { $push: {[`Students.${req.body.user_id}`]: {course_id: new ObjectId(req.body.course_id), enrollment_date: req.body.enrollment_date, status: req.body.status}}};
        db.collection("Enrollments").updateOne(query, update, options)
        
        res.send({message: "ok"})
    })
});

app.post('/courses/:id/Progress', async function (req, res) {
    let quizzes = []
    let assignments = []
    
    db.collection("Courses").findOne({_id: new ObjectId(req.body.course_id)}).then(async(course)=>{
        try {
            course.quizzes.forEach(async(quiz)=>{
                db.collection("Quizzes").findOne({_id: quiz}).then(async(quiz)=>{
                    quizzes.push({_id: quiz._id, title: quiz.title, max_attempts: quiz.max_attempts, attempts: 0, grade: 'None'})
                    if (quizzes.length === course.quizzes.length){
                        db.collection("Progress").updateOne({student_id: req.body.user_id, course_id: req.body.course_id},{$set: {quizzes: quizzes}})
                    }    
                })
            })
            course.assessments.forEach(async(assessment)=>{
                db.collection("Assessments").findOne({_id: assessment}).then(async(assessment)=>{
                    assignments.push({_id: assessment._id, title: assessment.title, grade: 'None'})
                    if (assignments.length === course.assessments.length){
                        db.collection("Progress").updateOne({student_id: req.body.user_id, course_id: req.body.course_id},{$set: {assignments: assignments}})
                    }
                })
                
            })

        } catch (err){}
    }).then(()=>{
        db.collection("Progress").insertOne({
            student_id: req.body.user_id,
            course_id: req.body.course_id
        }).then(()=>{
            res.send({message: "ok"})
        })    
    })});

app.get('/courses/:id/EnrolledUsers', function (req, res) {
    let enrolled_users = [];
    db.collection("Enrollments").findOne({}).then((enrolled)=>{
        try {
           if ((enrolled && enrolled.Courses[req.params.id])) {
                enrolled.Courses[req.params.id].forEach((user_obj) => {
                    db.collection("Users").findOne({_id: new ObjectId(user_obj.user_id)}).then( (user) => {
                        enrolled_users.push({id: user._id, email: user.email, enrollment_date: user_obj.enrollment_date});
                        if (enrolled_users.length == enrolled.Courses[req.params.id].length)
                            res.send({enrolled_users: enrolled_users})
                        })
                })
            }
        } catch (err) {
            res.send({enrolled_users: []})
        }
    })
});

app.delete('/Unenroll', function (req, res) {
    db.collection("Enrollments").updateMany({}, {$pull: {[`Courses.${req.body.course_id}`]: {'user_id': new ObjectId(req.body.user_id)}}} )
    db.collection("Enrollments").updateMany({}, {$pull: {[`Students.${req.body.user_id}`]: {'course_id': new ObjectId(req.body.course_id)}}} )
    res.send({message: "ok"})
});

app.get('/EnrollmentInfo/:id/:std_id',  async function (req, res) {
    var found = false;
    await db.collection("Enrollments").findOne({}).then((enrollments) => {
        try {
            if (enrollments.Courses[req.params.id]){
                enrollments.Courses[req.params.id].forEach((user) => {
                    if ( toString(user.user_id)  == toString(req.params.std_id)){
                        found = true;
                    }
                })
            } 
        } catch (err) {}
    }).then( () => {
        res.send({enrollment_info: found})
    })
});

app.get('/users/:id/CourseInfo', function (req, res) {
    var courses_info = []
    db.collection("Enrollments").findOne({}).then((enrollments) => {
        if (enrollments.Students[req.params.id])
            enrollments.Students[req.params.id].forEach((course_enroll) => {
                db.collection("Courses").findOne({_id: course_enroll.course_id}).then((course) => {
                    courses_info.push({
                        course: course,
                        enroll_info: course_enroll
                    })
                    if (courses_info.length === enrollments.Students[req.params.id].length ) {
                        res.send({courses_info: courses_info})
                    }
                })
            })
        else {
            res.send({courses_info: courses_info})
        }
    })
});

app.listen(4000,()=>{
    console.log('Listening on port 4000');
});

