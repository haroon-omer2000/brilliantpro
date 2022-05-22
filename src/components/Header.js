import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({APP_NAME}) => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className='nav-link' to="/">
                    <a className="navbar-brand" href="#">{APP_NAME}</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <Link className='nav-link' to = "/Login">
                        <a className="nav-link">Log In</a>
                    </Link>
                    <Link className='nav-link' to = "/Register">
                        <a className="nav-link">Register</a>
                    </Link>
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header;