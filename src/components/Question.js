import React from 'react';
import '../styles/Quizzes.css'

const Question = ({question, id}) => {
  return (
    <div className="question">
        <p><strong>{id}. </strong>{question.question}</p>
        {
            question.options.map((option, i) => {
                return (
                    <div key = {i} className="form-check">
                        <input className="form-check-input" type="radio" name={question.question}   />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            {option.option}
                        </label>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Question;