import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Assesment from './Assessment';

const Assessments = () => {

  const params = useParams();

  const [assessments, setAssessments] = useState([]);
  const [user, setUser] = useState({
    email: null,
    role: null
  });

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role')
    });
  },[])

  useEffect(() => {
    fetch(`http://localhost:4000/courses/${params.id}/Assessments`).then(response => response.json()).then( status => {
        setAssessments(status['assessments']);
        console.log(status['assessments']);
    });
  },[]);

  return (
    <div>
         <h2 className='page-header'>Assesments ({assessments.length})</h2>
        {
            (user.role === "admin") ?
                <Link className='nav-link' to={"/Courses/" + params.id + "/Assessments/new"} params={{id: params.id}} >
                    <button className='btn btn-info add-quiz-btn' type="submit">Add Assesment</button>
                </Link>
            :
                false
        }
        {
            assessments.length !==0 ?
                assessments.map((assessment) => {
                    return (
                        <Assesment key = {assessment._id} assessment = {assessment} />
                    )
                })
            : 
                false
        }
    </div>
  )
}

export default Assessments;