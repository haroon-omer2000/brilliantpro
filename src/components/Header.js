import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Header = ({APP_NAME, user, setUser}) => {

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role')
    });
  },[])

  const logout = async () => {
      setUser({
          email: '',
          role: ''
      });
      localStorage.setItem('user', '');
      localStorage.setItem('role', '');
  }

  return (
    <div className='header-container'>
        <div className='app-header'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className='nav-link' to="/">
                        <p className="navbar-brand" href="#">{APP_NAME}</p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {
                            (user.role === "admin" && user.email) ?
                                <ul className="navbar-nav">
                                    <Link className='nav-link' to = "/AddCourse">
                                        <p className="nav-link">Add Course</p>
                                    </Link> 
                                </ul>
                            :
                                false
                        }
                        { 
                            (!user.email) ? 
                                <ul className="navbar-nav">
                                    <Link className='nav-link' to = "/Login">
                                        <p className="nav-link">Log In</p>
                                    </Link> 
                                    <Link className='nav-link' to = "/Register">
                                        <p className="nav-link">Register</p>
                                    </Link>
                                </ul>
                            :
                                <ul className="navbar-nav">
                                    <Link className='nav-link' to = "/">
                                            <p onClick={() => logout()} className="nav-link">Logout</p>
                                    </Link>
                                </ul>
                        }
                    </div>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Header;