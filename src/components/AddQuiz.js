import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Quizzes.css';

const AddQuiz = () => {

  const params = useParams();
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
      {
          question: "",
          options: [
              {
                  option: "",
                  correct: null
              }
          ]
      }
  ]);

  const handleChange = (i, e) => {
    let tempQuestions = [...questions];
    tempQuestions[i].question = e.target.value;
    setQuestions(tempQuestions);
    console.log(questions);
  }

  const addQuestion = () => {
      setQuestions([...questions,{
        question: "",
        options: [
            {
                option: "",
                correct: null
            }
        ]
      }]);
  }

  return (
    <div>
        <h2 className='page-header'>Add Quiz</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Quiz Title</label>
                <input onChange={(e) => setQuizTitle(e.target.value)} value={quizTitle} required type="text" className="form-control quiz-title" id="exampleFormControlInput1" placeholder="Give a title..." />
            </div>
            <button type='button' onClick={addQuestion} className='btn btn-info quiz-title'>Add Question</button>
            <div>
            {
                (questions.length !== 0) ? 

                    
                    questions.map((question, index) => {
                        return(
                        <div className='quiz-title' key = {index} >
                            <label htmlFor="exampleFormControlInput1" className="form-label">Question: {index + 1} </label>
                            <input onChange={ (e) => {handleChange(index, e); console.log(index)}} required type="text" className="form-control" value={question.question} id="exampleFormControlInput1" placeholder="Give a title..." />
                        </div>
                    )
                    })

                    : 
                        false
            }
            </div>
        </form>
    </div>
  )
}

export default AddQuiz;