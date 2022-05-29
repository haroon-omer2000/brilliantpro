import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Assesments = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [marks, setMarks] = useState(0);
  const [contentUpload, setContentUpload] = useState(null);

  const uploadContent = async(e) => {
    e.preventDefault();
    const imageRef = ref(storage, `course_materials/${contentUpload.name + v4()}`); 
    uploadBytes(imageRef, contentUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then( url => {
          addAssessment(url);
      });
    });
  }

  const addAssessment = async (url) => {

    const assessment_info = {
      title,
      marks,
      url
    }

    fetch(`http://localhost:4000/Courses/${params.id}/Assessments/new`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(assessment_info)
    }).then(response => response.json()).then(status => {
      navigate(-1);
    });

  }


  return (
    <div>
        <form onSubmit={uploadContent}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Assesment Title</label>
                <input onChange={(e) => {setTitle(e.target.value)}} required type="text" className="form-control"  placeholder='Assessment title...' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="quantity">Marks (5 - 100):</label>
              <input onChange={(e) => setMarks(e.target.value)} className="form-control" required type="number" id="quantity" name="quantity" min="5" max="100" />
            </div>
            <div>
                <label htmlFor="formFileLg" className="form-label">Upload content</label>
                <input onChange={(e) => {setContentUpload(e.target.files[0])}} accept=".pdf,.pptx,.xlsx,.docx" required className="form-control form-control-lg" id="formFileLg" type="file"/>
            </div><br/>
            <button className='btn btn-primary' type='submit'>Upload</button>
        </form>
    </div>
  )
}

export default Assesments;