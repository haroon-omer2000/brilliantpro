import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {

  const navigate = useNavigate();

  //////////////////// COURSE INFORMATION 
  const [title, setTitle] = useState('');
  const [weeks, setWeeks] = useState(1);
  const [price, setPrice] = useState(5);
  const [overview, setOverview] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [certificateUpload, setCertificateUpload] = useState(null);
  const [maxAttempts, setMaxAttempts] = useState(1);

  const uploadImage = async(e) => {
    e.preventDefault();
    const imageRef = ref(storage, `course_banners/${imageUpload.name + v4()}`); 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then( image => {
            uploadCertificate(image)
        })
    })
  }

  const uploadCertificate = (image) => {
    const certificateRef = ref(storage, `course_certificates/${certificateUpload.name + v4()}`); 
    uploadBytes(certificateRef, certificateUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then( certificate => {
            uploadContent(image, certificate)
        })
    })
  }

  //////////////////// QUIZ INFORMATION 
  const [quizTitle, setQuizTitle] = useState('');
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

  //////////////////// ASSIGNMENT INFORMATION 
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [marks, setMarks] = useState(0);
  const [contentUpload, setContentUpload] = useState(null);

  const uploadContent = async(image, certificate) => {
    const assessmentRef = ref(storage, `course_materials/${contentUpload.name + v4()}`); 
    uploadBytes(assessmentRef, contentUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then( url => {
          addCourse(image, certificate, url);
      });
    });
  }

  const addCourse = async(image, certificate, url, e) => {
    let published = false;
    const course_info = {
        title,
        weeks,
        overview,
        price,
        image,
        certificate,
        published
    };

    fetch('http://localhost:4000/add_course',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(course_info)
    }).then(response => response.json()).then(status => {
        let title = quizTitle; 
        let max_attempts = maxAttempts;
        const quiz_data = {
            title,
            questions,
            max_attempts
        };
    
        fetch(`http://localhost:4000/Courses/${status['course_id']}/Quizzes/new`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(quiz_data)
        }).then(response => response.json()).then(status => {
            let title = assignmentTitle;
            const assessment_info = {
                title,
                marks,
                url
              }
          
              fetch(`http://localhost:4000/Courses/${status['course_id']}/Assessments/new`,{
              method: "POST",
              headers: {
                  "Content-Type":"application/json"
              },
              body: JSON.stringify(assessment_info)
              }).then(response => response.json()).then(status => {
                navigate("/");
              });
        });
    });
  }

  return (
    <div className='container'>
        <h2 className='page-header'>Enter course details</h2>
        <form onSubmit={uploadImage}>
            <h3>Add Course Info</h3><hr/>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Course Title</label>
                <input onChange={(e) => {setTitle(e.target.value)}} required type="text" className="form-control"  placeholder='Course title...' />
            </div>
            <div className="mb-3">
                <label htmlFor="courseOverview" className="form-label">Course Overview</label>
                <input onChange={(e) => {setOverview(e.target.value)}} required type="text" className="form-control"  placeholder='Course overview...' />
            </div>
            <div className="mb-3">
                <label htmlFor="customRange3" className="form-label">Weeks: {weeks}</label>
                <input onChange={(e) => setWeeks(e.target.value)} required type="range" className="form-range" min="1" max="5" step="1" value={weeks} id="customRange3"/>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="price">Enter price in USD (5$ - 200$):</label>
              <input onChange={(e) => setPrice(e.target.value)} className="form-control" required type="number" id="quantity" name="quantity" min="5" max="1000" step="0.5"/>
            </div>
            <div>
                <label htmlFor="formFileLg" className="form-label">Upload course banner</label>
                <input onChange={(e) => {setImageUpload(e.target.files[0])}} accept=".png,.jpg,.jpeg" required className="form-control form-control-lg" id="formFileLg" type="file"/>
            </div><br/>
            <div>
                <label htmlFor="formFileLg" className="form-label">Upload course certificate</label>
                <input onChange={(e) => {setCertificateUpload(e.target.files[0])}} accept=".pdf" required className="form-control form-control-lg" id="formFileLg" type="file"/>
            </div><br/><br/>

            {/* ///////// QUIZ INFORMATION /////////////// */}
            <h3>Add Quiz</h3><hr/>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Quiz Title</label>
                <input onChange={(e) => setQuizTitle(e.target.value)} value={quizTitle} required type="text" className="form-control quiz-title" id="exampleFormControlInput1" placeholder="Give a title..." />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="max_attempts">Max Attempts (1 - 3):</label>
              <input onChange={(e) => setMaxAttempts(e.target.value)} className="form-control" value={maxAttempts} required type="number" id="max_attempts" name="max_attempts" min="1" max="3" />
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

            {/* ///////// ASSIGNMENT INFORMATION /////////////// */}
            <h3>Add Assignment</h3><hr/>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Assesment Title</label>
                <input onChange={(e) => {setAssignmentTitle(e.target.value)}} required type="text" className="form-control"  placeholder='Assessment title...' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="quantity">Marks (5 - 100):</label>
              <input onChange={(e) => setMarks(e.target.value)} className="form-control" required type="number" id="quantity" name="quantity" min="5" max="100" />
            </div>
            <div>
                <label htmlFor="formFileLg" className="form-label">Upload content</label>
                <input onChange={(e) => {setContentUpload(e.target.files[0])}} accept=".pdf,.pptx,.xlsx,.docx" required className="form-control form-control-lg" id="formFileLg" type="file"/>
            </div><br/>

            <button type="submit" className="btn btn-primary">ADD</button>
        </form>
    </div>
  )
}

export default AddCourse;