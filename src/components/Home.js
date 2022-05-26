import React from 'react';

const Home = ({user}) => {
  return (
    <div>
        <h2 className='page-header'>Home</h2>
        { (!user.email)?
            <p>nil</p>
            : <p>{user.email} {user.role}</p>
        }
    </div>
  )
}

export default Home;