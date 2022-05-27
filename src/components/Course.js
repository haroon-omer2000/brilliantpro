import React from 'react';
import '../styles/Courses.css';
import { Link } from 'react-router-dom';

const Course = ({id, title, weeks, overview, url}) => {
  return (
    <div className="col">
      <div className="card h-100 text-center">
        <img src={url} className="courses-img card-img-top" alt='...'/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{overview}</p>
          <p className="card-text"><strong>Completion time: </strong>{weeks} weeks</p>
        </div>
        <div className='card-option'>
          <Link className='nav-link' to={"/Courses/" + id} >
            <button class="btn btn-primary" type="submit">Show</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Course;