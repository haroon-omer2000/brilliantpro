import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [weeks, setWeeks] = useState(1);
  const [overview, setOverview] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}`).then(response => response.json()).then( status => { 
        setTitle(status['course'].title);
        setWeeks(status['course'].weeks);
        setOverview(status['course'].overview);
    });
  },[]);

  const updateCourse = async(e) => {
    e.preventDefault();
    const course_info = {
        title,
        weeks,
        overview
    };

    fetch(`http://localhost:4000/courses/${params.id}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(course_info)
    }).then(response => response.json()).then(status => {
        console.log(status);
        navigate("/");
    });
  }

  return (
    <div className='container'>
    <h2 className='page-header'>Update course details</h2>
        <form onSubmit={updateCourse}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Course Title</label>
                <input onChange={(e) => {setTitle(e.target.value); console.log(title)}} required type="text" value={title} className="form-control"  placeholder='Course title...' />
            </div>
            <div className="mb-3">
                <label htmlFor="courseOverview" className="form-label">Course Overview</label>
                <input onChange={(e) => {setOverview(e.target.value)}} required type="text" value={overview} className="form-control"  placeholder='Course overview...' />
            </div>
            <div className="mb-3">
                <label htmlFor="customRange3" className="form-label">Weeks: {weeks}</label>
                <input onChange={(e) => setWeeks(e.target.value)} required type="range" className="form-range" min="1" max="5" step="1" value={weeks} id="customRange3"/>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default UpdateCourse;