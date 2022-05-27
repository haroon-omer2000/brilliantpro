import React from 'react'

const Notice = ({notice, style_notice}) => {
  return (
    <div className={style_notice} role="alert">
        {notice}
    </div>
  )
}

export default Notice;