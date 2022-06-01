import React, { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Material from './Material';

const Materials = () => {

  const params = useParams();

  const [materials, setMaterials] = useState([]);
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

    fetch(`http://localhost:4000/courses/${params.id}/Materials`).then(response => response.json()).then( status => {
        setMaterials(status['materials']);
    });
  },[]);

  return (
    <div>
        <h2 className='page-header'>Materials ({materials.length})</h2>
        {
            (user.role === "admin") ?
                <Link className='nav-link' to={"/Courses/" + params.id + "/Materials/new"} params={{id: params.id}} >
                    <button className='btn btn-info add-quiz-btn' type="submit">Add Material</button>
                </Link>
            :
                false
        }
        {
            materials.length !==0 ?
                materials.map((material) => {
                    return (
                        <Material key = {material._id} material = {material} />
                    )
                })
            : 
                false
        }
    </div>
  )
}

export default Materials;