import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Quiz from './Quiz';
import '../styles/Quizzes.css';

const Quizzes = () => {

  const params = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [user, setUser] = useState({
    email: null,
    role: null
  });

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role')
    });
  },[])

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}/Quizzes`).then(response => response.json()).then( status => {
        setQuizzes(status['quizzes']);
    });
  },[]);

  return (
    <div>   
        <h2 className='page-header'>Quizzes</h2>
        {
            (user.role === "admin") ?
                <button className='btn btn-info add-quiz-btn'>Add Quiz</button>
            :
                false
        }
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