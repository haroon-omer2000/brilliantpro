import React, {useState} from 'react';

const Register = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    const user_registration = {
        email,
        password
    };
    const response = await fetch('http://localhost:4000/register_user',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user_registration)
    }).then(response => response.json()).then( status => {
        console.log(status['message']);
    });
  }

  return (
    <div className='container'>
        <h2 className='page-header'>Enter signup information</h2>
        <form onSubmit={registerUser}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onChange={(e) => {setEmail(e.target.value)}} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} required type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button required type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register;