import React, { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

const Materials = () => {

  const params = useParams();

  const [materials, setMaterials] = useState([]);
  const [user, setUser] = useState({
    email: null,
    role: null
  });

  useEffect(() => {
    setUser({
    email: localStorage.getItem('user'),
    role: localStorage.getItem('role')
    });
  },[]);

  return (
    <div>
        <h2 className='page-header'>Materials</h2>
        {
            (user.role === "admin") ?
                <Link className='nav-link' to={"/Courses/" + params.id + "/Materials/new"} params={{id: params.id}} >
                    <button className='btn btn-info add-quiz-btn' type="submit">Add Material</button>
                </Link>
            :
                false
        }
    </div>
  )
}

export default Materials;