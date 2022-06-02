import React from 'react';
import { Link } from 'react-router-dom';

const CourseInfo = ({course, enroll_info}) => {
  return (
    <div className="col">
      <div className="card h-100 text-center">
        <img src={course.url} className="courses-img card-img-top" alt='...'/>
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.overview}</p>
          <p className="card-text"><strong>Enrollment Date: </strong>{enroll_info.enrollment_date}</p>
          <p className="card-text"><strong>Status: </strong>{enroll_info.status.charAt(0).toUpperCase() + enroll_info.status.slice(1)}</p>
        </div>
        <div>       
            <Link className='nav-link' to={"/Courses/" + course._id} params={{id: course._id}} >
                <button className="btn btn-primary" type="submit">Go</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseInfo;