import React from 'react'

const Assessment = ({assessment}) => {
  return (
    <div className="quiz card">
        <div className="card-body">
            <h5 className="card-title">{assessment.title}</h5>
            <p className="card-text">Total marks: <strong>{assessment.marks}</strong></p>
            <a href={assessment.url} download rel="noopener noreferrer" target="_blank">
               View Assignment
            </a>
        </div>
    </div>    
  )
}

export default Assessment;