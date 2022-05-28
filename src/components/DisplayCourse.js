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
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            {title}
          </button>
        </h2>
        <img src={url} class="rounded flex-start" alt="..." />
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div class="accordion-body">
            <div className='course-content'>
              <strong className='course-show-heading'>Overview</strong>{overview}
              <p><strong className='course-show-heading'>Weeks to complete: </strong>{weeks}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            Course Assesments
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div class="accordion-body">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <Link className='nav-link' to={"/Courses/" + params.id + "/Quizzes"} params={{id: params.id}} >
                <p>Quizzes</p>
              </Link>
              <Link className='nav-link' to={"/Courses/" + params.id + "/Quizzes"} params={{id: params.id}} >
                <p>Assignments</p>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            Course Materials
          </button>
        </h2>
        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
          <div class="accordion-body">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">View Materials</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayCourse;