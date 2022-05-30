import React from 'react'

const Material = ({material}) => {
  return (
    <div className="quiz card">
        <div className="card-body">
            <h5 className="card-title">{material.title}</h5>
            <a href={material.url} download rel="noopener noreferrer" target="_blank">
            View Material
            </a>
        </div>
    </div>    
  )
}

export default Material;