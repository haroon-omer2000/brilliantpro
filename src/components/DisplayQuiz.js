import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Question from './Question';
import '../styles/Quizzes.css'

const DisplayQuiz = () => {

  const navigate = useNavigate();
  const {id, course_id} = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    fetch(`http://localhost:4000/courses/${course_id}/Quizzes/${id}`).then(response => response.json()).then( status => {
        setTitle(status['quiz'].title);
        setQuestions(status['quiz'].questions);
    });
  },[])

  const submitQuiz = async (e) => {
    e.preventDefault();

    let user_id = localStorage.getItem('user_id');
    let quiz_id = id;

    let quiz_data = {
      user_id,
      course_id,
      quiz_id,
      questions,
      answers
    };

    fetch(`http://localhost:4000/Courses/Quiz/Submission`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(quiz_data)
    }).then(response => response.json()).then(status => {
        navigate(-1);
    });

  }

  return (  
    <div>
        <h2 className='page-header'>{title}</h2>
        <form onSubmit={submitQuiz}>
          {
              (questions.length !== 0) ?
                  questions.map((question, i) => {
                      return(
                          <Question key = {i} question = {question} id = {i + 1} setAnswers = {setAnswers} />
                      )
                  })
              : false
          }
          {
            (localStorage.getItem('role') === "student") ?
              <button className='btn btn-primary quiz-sbt'>Submit</button>
            : 
              false
          }
          </form>
    </div>
  )
}

export default DisplayQuiz