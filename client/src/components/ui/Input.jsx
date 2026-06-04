import React from 'react'

const Input = ({ className="", ...props }) => {
  return (
    <div>
      <input
          {...props}
        className={`border border-gray-300 w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  )
}

export default Input
