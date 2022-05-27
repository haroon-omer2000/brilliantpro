import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const DisplayCourse = () => {
  
  const params = useParams();

  const [title, setTitle] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [overview, setOverview] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}`).then(response => response.json()).then( status => {
        console.log(status);
    });
  },[])

  return (
    <div className="card h-100 text-center">
        {/* <img src={url} className="courses-img card-img-top" alt='...'/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{overview}</p>
          <p className="card-text"><strong>Completion time: </strong>{weeks} weeks</p>
        </div>
        <div className='card-option'>
          <button className="btn btn-primary" type="submit">Details</button>
        </div> */}
    </div>
  )
}

export default DisplayCourse;