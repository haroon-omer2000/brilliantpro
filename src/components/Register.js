import React from 'react'

const Register = () => {
  return (
    <div className='container'>
        <h2 className='page-header'>Enter Signup information</h2>
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input required type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <button required type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Register;