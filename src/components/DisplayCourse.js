import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Courses.css'

const DisplayCourse = () => {
  
  const params = useParams();

  const [title, setTitle] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [overview, setOverview] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}`).then(response => response.json()).then( status => {
        setTitle(status['course'].title);
        setWeeks(status['course'].weeks);
        setOverview(status['course'].overview);
        setUrl(status['course'].url);
    });
  },[])

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            {title}
          </button>
        </h2>
        <img src={url} className="rounded flex-start" alt="..." />
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div className="accordion-body">
            <div className='course-content'>
              <strong className='course-show-heading'>Overview</strong>{overview}
              <p><strong className='course-show-heading'>Weeks to complete: </strong>{weeks}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            Course Resources
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="accordion-body">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link className='nav-link' to={"/Courses/" + params.id + "/Quizzes"} params={{id: params.id}} >
                <p>Quizzes</p>
              </Link>
              <Link className='nav-link' to={"/Courses/" + params.id + "/Quizzes"} params={{id: params.id}} >
                <p>Assignments/Materials</p>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayCourse;