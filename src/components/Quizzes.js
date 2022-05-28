import React from 'react';
import { useParams } from 'react-router-dom';

const Quizzes = () => {

  const params = useParams();

  return (
    <div>Quizzes{params.id}</div>
  )
}

export default Quizzes;