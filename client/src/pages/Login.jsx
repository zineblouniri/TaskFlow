import React from 'react'
import API from '../api/axios.js'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [user , setUser] = React.useState({
        email : '',
        password : ''
    })
    const navigate = useNavigate()
    const [loading , setLoading] = React.useState(false)
    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await API.post('/auth/login' , user)
            console.log(res)
            localStorage.setItem('token' , res.data.token)  
            navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            setLoading(false)
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <form  onSubmit={handleSubmit}>
            <input type="email" required placeholder='Email' value = {user.email} onChange={handleChange} />
            <input type="password" required placeholder='password' value = {user.password} onChange={handleChange} />
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
