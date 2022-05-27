import React, {useState, useEffect} from 'react';
import Course from './Course';
import Notice from './Notice';


const Courses = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/courses').then(response => response.json()).then( status => {
       console.log(status);
       setCourses(status['courses']);
    });
  },[])

  return (
    <div>
        <h2 className='page-header'>Courses</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
        {
            (courses.length !== 0) ? (
                 
                courses.map((course) => {
                    return (
                        <Course key = {course._id} id = {course._id} title = {course.courseTitle} weeks = {course.weeks} overview = {course.overview} url = {course.url} />
                    )
                }))
            :
                <Notice notice = {"There are no available courses"} style = {"alert alert-warning"} />
        }
        </div>

    </div>
  )
}

export default Courses;