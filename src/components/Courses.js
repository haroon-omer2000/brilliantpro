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
  )
}

export default Courses;