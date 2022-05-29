import { async } from '@firebase/util';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Quizzes.css';

const AddQuiz = () => {

  const params = useParams();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
      {
          question: "",
          options: [
              {
                  option: "",
                  correct: false
              }
          ]
      }
  ]);

  const handleQuestionChange = (i, e) => {
    let tempQuestions = [...questions];
    tempQuestions[i].question = e.target.value;
    setQuestions(tempQuestions);
  }

  const handleOptionChange = (index, i, e) => {
    let tempQuestions = [...questions];
    tempQuestions[index].options[i].option = e.target.value;
    setQuestions(tempQuestions);
  }

  const addQuestion = () => {
      setQuestions([...questions,{
        question: "",
        options: [
            {
                option: "",
                correct: false
            }
        ]
      }]);
  }

  const addOption = (i) => {
    let tempQuestions = [...questions];
    let question = {...questions[i]};
    question.options.push( {
        option: "",
        correct: false
    })
    tempQuestions[i] = question;
    setQuestions(tempQuestions);
  }

  const markCorrect = (e, i) => {
    let tempQuestions = [...questions];
    let question = {...questions[i]};
    question.options[e.target.value].correct = true;
    tempQuestions[i] = question;
    setQuestions(tempQuestions);
  }

  const addQuiz = async (e) => {
    e.preventDefault();

    const quiz_data = {
        title,
        questions
    };

    fetch(`http://localhost:4000/Courses/${params.id}/Quizzes/new`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(quiz_data)
    }).then(response => response.json()).then(status => {
        console.log(status);
    });
  }

  return (
    <div>
        <h2 className='page-header'>Add Quiz</h2>
        <form onSubmit={addQuiz}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Quiz Title</label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} required type="text" className="form-control quiz-title" id="exampleFormControlInput1" placeholder="Give a title..." />
            </div>
            <button type='button' onClick={addQuestion} className='btn btn-info quiz-title'>Add Question</button>
            <div>
            {
                (questions.length !== 0) ? 

                    
                    questions.map((question, index) => {
                        return (
                            <div className='quiz-title' key = {index} >
                                <label htmlFor="exampleFormControlInput1" className="form-label">Question: {index + 1} </label>
                                <input onChange={ (e) => handleQuestionChange(index, e)} required type="text" className="form-control question-text" value={question.question} id="exampleFormControlInput1" placeholder="Give a title..." />
                                <button type='button' onClick={(e) => addOption(index)} className='btn btn-info question-text'>Add Option</button><br/>
                                <div className="input-group input-space">
                                    {
                                        question.options.map((option, i) => {
                                            return (
                                                <div key={i} >
                                                    <input onChange={(e) => handleOptionChange(index, i, e)} required type="text" placeholder='option value...' className="form-control" />
                                                </div>
                                                // <div  onChange={(e) => markCorrect(index, i)} className='form-check form-check-inline question-text' key = {i} >
                                                //     {/* <inputclassName="form-check-input" type="radio" name={question.question}/> */}
                                                //     <input onChange = { (e) => handleOptionChange(index, i, e)} value = {option.option} className='form-control' />
                                                // </div>
                                            )
                                        })
                                    }
                                </div>
                                <select required className="form-select" aria-label="Default select example" onChange={(e) => markCorrect(e, index)}>
                                    <option selected value="" disabled>Select the correct answer</option>
                                    {question.options.map( (option, i) => {
                                        return (
                                            <option key={i} value={i}>{option.option}</option>
                                        )
                                    })}
                                </select>
                            </div>                            
                        )
                    })

                    : 
                        false
            }
            </div>
            <button className='btn btn-primary' type='submit'>ADD</button>
        </form>
    </div>
  )
}

export default AddQuiz;