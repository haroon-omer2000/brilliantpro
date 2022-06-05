import React, {useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Courses.css'
import { ProgressBar } from 'react-bootstrap';

const DisplayCourse = () => {
  
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [overview, setOverview] = useState(null);
  const [url, setUrl] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [published, setPublished] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({
    email: null,
    role: null,
    id: null
  });

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role'),
        id: localStorage.getItem('user_id')
    });

    ///////// COURSE INFORMATION
    fetch(`http://localhost:4000/courses/${params.id}`).then(response => response.json()).then( status => {
        setTitle(status['course'].title);
        setWeeks(status['course'].weeks);
        setOverview(status['course'].overview);
        setUrl(status['course'].image);
        setCertificate(status['course'].certificate);
        setPublished(status['course'].published);
        setCourseId(status['course']._id);
  
        ///////// COURSE PROGRESS
        let user_id = localStorage.getItem('user_id')

        if (localStorage.getItem('role') !== "admin") {
          let course_id = status['course']._id;
          let course_progress = {
            user_id,
            course_id
          }
          fetch(`http://localhost:4000/Courses/Progress`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(course_progress)
            }).then(response => response.json()).then(status => {
              setProgress(status['progress']);
            });
        }
    })
  },[])

  const publishCourse = async () => {
    let publish_course = {
      courseId
    }

    fetch(`http://localhost:4000/Courses/${courseId}/Publish`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(publish_course)
    }).then(response => response.json()).then(status => {
          navigate(-1);
      });
  }

  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            {title}
          </button>
        </h2>
        <img src={url} className="course-img rounded flex-start" alt="..." />
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div className="accordion-body">
            <div className='course-content'>
              <strong className='course-show-heading'>Overview</strong>{overview}
              <p><strong className='course-show-heading'>Weeks to complete: </strong>{weeks}</p>
            </div>
            {
              (user.role === "admin" && !published) ? 
                <button onClick={publishCourse} className='btn btn-primary'>Publish</button> 
              :
                false
            }
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
              <Link className='nav-link' to={"/Courses/" + params.id + "/Assessments"} params={{id: params.id}} >
                <p>Assignments</p>
              </Link>
              <Link className='nav-link' to={"/Courses/" + params.id + "/Materials"} params={{id: params.id}} >
                <p>Materials</p>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {
        (progress === 100) ?
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                Course Certificate
              </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
              <div className="accordion-body">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <a style={{"textDecoration": "none"}} href={certificate} download rel="noopener noreferrer" target="_blank">
                    View Certificate
                  </a>
                </ul>
              </div>
            </div>
          </div>
        :
          false
      }
      

      {
        (user.role === "admin") ?
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  Course Information
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                <div className="accordion-body">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className='nav-link' to={"/Courses/" + params.id + "/EnrolledUsers"} state={{id: params.id}} >
                      <p>Enrolled Users</p>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          :
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                  Course Progress
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                <div className="accordion-body">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <ProgressBar animated now={`${progress}`} label={`${progress}%`} />
                  </ul>
                </div>
              </div>
            </div>
      }
     
    </div>
  )
}

export default DisplayCourse;