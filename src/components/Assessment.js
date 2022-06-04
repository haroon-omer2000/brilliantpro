import React, {useEffect, useState} from 'react';

const Assessment = ({assessment, course_id}) => {

  const [completed, setCompleted] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem('role') === "student") {
      let user_id = localStorage.getItem('user_id');
      let assignment_id = assessment._id;

      let assignment_info = {
        user_id,
        course_id,
        assignment_id
      }
      fetch(`http://localhost:4000/AssignmentCompletedCheck`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(assignment_info)
        }).then(response => response.json()).then(status => {
          setCompleted(status['completed'])
        });
    }
  },[])

  const completeAssignment = async () => {
    let user_id = localStorage.getItem('user_id');
    let assignment_id = assessment._id;

    let assignment_info = {
      user_id,
      course_id,
      assignment_id
    }

    fetch(`http://localhost:4000/AssignmentCompleted`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(assignment_info)
    }).then(response => response.json()).then(status => {
        setCompleted(status['completed'])
    });

  }

  return (
    <div className="quiz card">
        <div className="card-body">
            <h5 className="card-title">{assessment.title}</h5>
            <p className="card-text">Total marks: <strong>{assessment.marks}</strong></p>
            <a href={assessment.url} download rel="noopener noreferrer" target="_blank">
               View Assignment
            </a>
        </div>
        <div className="card-body">
          {
              (localStorage.getItem('role') === 'student') ? 
                (completed) ?
                    <button disabled className='btn btn-secondary'>Marked as completed</button>
                  : 
                    <button onClick={completeAssignment} className='btn btn-success'>Mark as completed</button>
              :
                false
          }
        </div>
    </div>    
  )
}

export default Assessment;