import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Quiz from './Quiz';

const Quizzes = () => {

  const params = useParams();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}/Quizzes`).then(response => response.json()).then( status => {
        setQuizzes(status['quizzes']);
    });
  },[]);

  return (
    <div>   
        <h2 className='page-header'>Quizzes</h2>
    {
        quizzes.length !==0 ?
            quizzes.map((quiz) => {
                return (
                    <Quiz key = {quiz._id} quiz = {quiz} />
                )
            })
        : 
            false
    }
    </div>
    
  )
}

export default Quizzes;