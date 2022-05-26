import React from 'react'

const Course = ({id, title, weeks, overview, url}) => {
  return (
    <div>{id}{title},{weeks},{overview},{url}</div>
  )
}

export default Course;