import React from 'react'

const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    
      />
    </div>
  )
}

export default Input
