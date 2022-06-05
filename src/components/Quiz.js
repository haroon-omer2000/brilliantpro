import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Quizzes.css';

const Quiz = ({quiz}) => {

  const params = useParams();

  const [attempts, setAttempts] = useState(0);
  const [grade, setGrade] = useState('');

  useEffect(()=>{

    let course_id = params.id;
    let quiz_id = quiz._id;
    let user_id = localStorage.getItem('user_id');

    let quiz_data = {
      course_id,
      user_id,
      quiz_id
    };

    if (localStorage.getItem("role") === "student") {
      fetch(`http://localhost:4000/Courses/Quizzes/Attempts`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(quiz_data)
        }).then(response => response.json()).then(status => {
            setAttempts(status['attempts'])
            setGrade(status['grade'])
        });
      }
  },[])
  
  return (
    <div className="quiz card">
      <div className="card-body">
        <h5 className="card-title">{quiz.title}</h5>
        <p className="card-text">Total questions: <strong>{quiz.questions.length}</strong></p>
        <p className="card-text">Maximum attempts: <strong>{quiz.max_attempts}</strong></p>
        {
          (localStorage.getItem("role") === "student") ?
            <div>
              <p className="card-text">Your attempts: <strong>{attempts}</strong></p>
              <p className="card-text">Grade: <strong>{grade}</strong></p><br/>
            </div>
          : 
            false
        }
        {
          (attempts < quiz.max_attempts) ?
            <Link to={"/Courses/" + params.id + "/Quizzes/" + quiz._id} params={{id: quiz._id, course_id: params.id}} >
              <p className='btn btn-primary'>Start</p>
            </Link>
          :
            false
        }
      </div>
    </div>
  )
}

export default Quiz;