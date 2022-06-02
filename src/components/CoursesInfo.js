import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseInfo from './CourseInfo';
import Notice from './Notice';

const CoursesInfo = () => {
  
  const location = useLocation();
  const [coursesInfo, setCoursesInfo] = useState([]);

  const id = location.state?.id;
  
  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}/CourseInfo`).then(response => response.json()).then( status => {
      setCoursesInfo(status['courses_info']);
   });
  },[])
  
  return (
    <div>
        <h2 className='page-header'>Your Courses</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
        {
            (coursesInfo.length !== 0) ? (
                 
                coursesInfo.map((course, i) => {
                    return (
                      <CourseInfo key = {i} course = {course.course} enroll_info = {course.enroll_info} />
                    )
                }))
            :
                <Notice notice = {"You have not enrolled in any courses"} style_notice = {"alert alert-warning"} />
        }
        </div>
    </div>
  )
}

export default CoursesInfo;