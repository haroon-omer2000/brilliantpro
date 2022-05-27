import React from 'react';
import '../styles/Courses.css'

const Course = ({id, title, weeks, overview, url}) => {
  return (

    <div className="col" style={{"width": "3%;"}}>
    <div className="card h-100">
      <img src={url} className="courses-img card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{overview}</p>
      </div>
    </div>
    </div>
  )
}

export default Course;