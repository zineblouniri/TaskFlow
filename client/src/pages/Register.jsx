import React from 'react'
import API from '../api/axios.js'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })
    const {name, email, password} = formData
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData((prev) => ({...prev , [e.target.name] : e.target.value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/register',formData)
            console.log('User registered successfully:', res.data)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error registering user:', error)
        }
    }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" required placeholder="Username" name='name' value={name} onChange={handleChange}/>
            <input type="email" required placeholder="Email" name='email' value={email} onChange={handleChange}/>
            <input type="password" required placeholder="Password" name='password' value={password} onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default Register
