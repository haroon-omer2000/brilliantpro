import React from 'react'

const Header = ({APP_NAME}) => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{APP_NAME}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" href="#">Log In</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Sign Up</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header;