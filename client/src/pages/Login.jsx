import React from 'react'
import API from '../api/axios.js'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'


const Login = () => {
    const [user , setUser] = React.useState({
        email : '',
        password : ''
    })
    const navigate = useNavigate()
    const [loading , setLoading] = React.useState(false)
    const [error , setError] = React.useState('')
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
            
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
            
        }finally {
            setLoading(false)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='w-full max-w-xl p-6 mx-4 border border-gray-100 rounded-2xl shadow-lg flex flex-col gap-6 items-center'>
            <h1 className ="text-2xl font-semibold text-gray-900 mt-6 mb-10">Login</h1>
            {error && <p className='text-red-500'>{error}</p>}
        <form  onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <Input type="email" name='email' required placeholder='Email' value = {user.email} onChange={handleChange} />
            <Input type="password" name='password' required placeholder='password' value = {user.password} onChange={handleChange} />
            <Button className='bg-blue-500 hover:bg-blue-600' type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </form>
        <p>Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
        </div>
    </div>
  )
}

export default Login
