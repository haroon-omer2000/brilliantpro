import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Assesments = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contentUpload, setContentUpload] = useState(null);

  const uploadContent = async(e) => {
    e.preventDefault();
    const resourceRef = ref(storage, `courses_resources/${contentUpload.name + v4()}`); 
    uploadBytes(resourceRef, contentUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then( url => {
          addMaterial(url);
      });
    });
  }

  const addMaterial = async (url) => {

    const material_info = {
      title,
      url
    }

    fetch(`http://localhost:4000/Courses/${params.id}/Materials/new`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(material_info)
    }).then(response => response.json()).then(status => {
      navigate(-1);
    });

  }


  return (
    <div>
        <h2 className='page-header'>Enter material details</h2>
        <form onSubmit={uploadContent}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Material Title</label>
                <input onChange={(e) => {setTitle(e.target.value)}} required type="text" className="form-control"  placeholder='Material title...' />
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