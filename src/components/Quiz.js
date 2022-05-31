import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/Quizzes.css';

const Quiz = ({quiz}) => {

  const params = useParams();
  
  return (
    <div className="quiz card">
      <div className="card-body">
        <h5 className="card-title">{quiz.title}</h5>
        <p className="card-text">Total questions: <strong>{quiz.questions.length}</strong></p>
        <Link to={"/Courses/" + params.id + "/Quizzes/" + quiz._id} params={{id: quiz._id, course_id: params.id}} >
            <p className='btn btn-primary'>Start</p>
        </Link>
      </div>
    </div>
  )
}

export default Quiz;