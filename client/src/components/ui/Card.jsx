import React from 'react'

const Card = ({children,className = ""}) => {
  return (
    <div className={`bg-white p-4 md:p-6 rounded-2xl shadow ${className}`}>
      {children}
    </div>
  )
}

export default Card
