import React, {useEffect, useState} from 'react';
import '../styles/Quizzes.css'

const Question = ({question, id}) => {

  const [user, setUser] = useState({
    email: null,
    role: null
  });

  useEffect(() => {
    setUser({
      email: localStorage.getItem('user'),
      role: localStorage.getItem('role')
    });
  },[]);

  return (
    <div className="question">
        <p><strong>{id}. </strong>{question.question}</p>
        {
            question.options.map((option, i) => {
                return (
                    <div key = {i} className="form-check">
                        <input className="form-check-input" type="radio" name={question.question}   />
                        <label className="form-check-label quiz-correct" htmlFor="exampleRadios1">
                            {option.option}
                            {
                                (user.role === 'admin' && option.correct) ?
                                    <p className='correct-answer'>(Correct)</p> 
                                : false
                            }
                        </label>
                        
                    </div>
                )
            })
        }
    </div>
  )
}

export default Question;