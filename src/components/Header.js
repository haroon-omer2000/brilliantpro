import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Header.css'

const Header = ({APP_NAME, user, setUser}) => {

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  },[])

  const logout = async () => {
      setUser({
          email: '',
          role: ''
      });
      localStorage.setItem('user', '');
  }

  return (
    <div className='header-container'>
        <div className='app-header'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className='nav-link' to="/">
                        <a className="navbar-brand" href="#">{APP_NAME}</a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        { (!user.email) ? 
                            <ul className="navbar-nav">
                                <Link className='nav-link' to = "/Login">
                                    <a className="nav-link">Log In</a>
                                </Link> 
                                <Link className='nav-link' to = "/Register">
                                    <a className="nav-link">Register</a>
                                </Link>
                            </ul>
                            :
                            <ul className="navbar-nav">
                                <Link className='nav-link' to = "/">
                                        <a onClick={() => logout()} className="nav-link">Logout</a>
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