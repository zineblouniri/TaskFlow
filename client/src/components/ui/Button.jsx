import React from 'react'

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-3 rounded-lg transition text-white ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
