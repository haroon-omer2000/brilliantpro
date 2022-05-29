import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [weeks, setWeeks] = useState(1);
  const [overview, setOverview] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = async(e) => {
    e.preventDefault();
    const imageRef = ref(storage, `course_banners/${imageUpload.name + v4()}`); 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then( url => {
            addCourse(url);
        })
    })
  }

  const addCourse = async(url) => {
    
    const course_info = {
        title,
        weeks,
        overview,
        url
    };

    fetch('http://localhost:4000/add_course',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(course_info)
    }).then(response => response.json()).then(status => {
        navigate("/");
    });
  }

  return (
    <div className='container'>
        <h2 className='page-header'>Enter course details</h2>
        <form onSubmit={uploadImage}>
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
            <div>
                <label htmlFor="formFileLg" className="form-label">Upload course banner</label>
                <input onChange={(e) => {setImageUpload(e.target.files[0])}} accept=".png,.jpg,.jpeg" required className="form-control form-control-lg" id="formFileLg" type="file"/>
            </div><br/>
            <button type="submit" className="btn btn-primary">ADD</button>
        </form>
    </div>
  )
}

export default AddCourse;