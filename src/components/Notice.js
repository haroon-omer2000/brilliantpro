import React from 'react'

const Notice = ({notice, style}) => {
  return (
    <div className={style} role="alert">
        {notice}
    </div>
  )
}

export default Notice;