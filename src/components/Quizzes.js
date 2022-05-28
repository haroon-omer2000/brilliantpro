import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Quizzes = () => {

  const params = useParams();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}/Quizzes`).then(response => response.json()).then( status => {
        setQuizzes(status['quizzes']);
    });
  },[]);

  return (
    <div>Quizzes{params.id}==
    
    {
        quizzes.length !==0 ?
            quizzes.map((quiz) => {
                return (
                    <p>{quiz.title}</p>
                )
            })
        : 
            false
    }
    </div>
    
  )
}

export default Quizzes;