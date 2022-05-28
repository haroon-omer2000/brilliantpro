import React from 'react';
import { useParams } from 'react-router-dom';

const DisplayQuiz = () => {

  const {id, course_id} = useParams();
  
  return (
    <div>DisplayQuiz{id}<br/>{course_id}</div>
  )
}

export default DisplayQuiz