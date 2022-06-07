import React, {useEffect, useState} from 'react';
import '../styles/Quizzes.css'

const Question = ({question, id, setAnswers}) => {

  const [user, setUser] = useState({
    email: null,
    role: null,
    id: null
  });

  useEffect(() => {
    setUser({
      email: localStorage.getItem('user'),
      role: localStorage.getItem('role'),
      id: localStorage.getItem('user_id')
    });
  },[]);

  const setAnswer = (e, question) => {
    setAnswers((prev) => [...prev,{question: question, answer: e.target.value}])
  }

  return (
    <div className="question">
        <p><strong>{id}. </strong>{question.question}</p>
        {
            question.options.map((option, i) => {
                return (
                    <div key = {i} className="form-check">
                        <input onChange={(e)=> setAnswer(e, question.question)} required className="form-check-input" value={option.option} type="radio" name={question.question}   />
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