import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Question from './Question';
import '../styles/Quizzes.css'

const DisplayQuiz = () => {

  const {id, course_id} = useParams();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    fetch(`http://localhost:4000/courses/${course_id}/Quizzes/${id}`).then(response => response.json()).then( status => {
        setTitle(status['quiz'].title);
        setQuestions(status['quiz'].questions);
    });
  },[])

  return (  
    <div>
        <h2 className='page-header'>{title}</h2>
        {
            (questions.length !== 0) ?
                questions.map((question, i) => {
                    return(
                        <Question key = {i} question = {question} id = {i + 1} />
                    )
                })
            : false
        }
        <button className='btn btn-primary quiz-sbt'>Submit</button>
    </div>
  )
}

export default DisplayQuiz