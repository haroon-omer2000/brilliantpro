import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
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
        <h2 className='page-header'>Quizzes ({quizzes.length})</h2>
        {
            (user.role === "admin") ?
                <Link className='nav-link' to={"/Courses/" + params.id + "/Quizzes/new"} params={{id: params.id}} >
                    <button className='btn btn-info add-quiz-btn' type="submit">Add Quiz</button>
                </Link>
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