import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const user_login = {
        email,
        password
    };
    const response = await fetch('http://localhost:4000/login_user',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user_login)
    }).then(response => response.json()).then( status => {
        localStorage.setItem('user',status['user']);
        setUser({
              email: status['user'],
              role: status['role']       
        });
        navigate("/");
    });
  }

  return (
    <div className='container'>
        <h2 className='page-header'>Enter login information</h2>
        <form onSubmit={loginUser}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onChange={(e) => {setEmail(e.target.value)}} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} required type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login;