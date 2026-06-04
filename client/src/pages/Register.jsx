import React from 'react'
import API from '../api/axios.js'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'

const Register = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = React.useState('')
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
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed")
        }
    }
  return (
    <div className='bg-gray-50 min-h-screen  flex items-center justify-center'>
        <div className='max-w-xl w-full  p-6 mx-4 border border-gray-100 rounded-xl shadow-md   flex flex-col gap-6 justify-center items-center'>
            <h1 className='text-2xl text-gray-900 font-semibold mb-10'>Register</h1>
            {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <Input type="text" required placeholder="Username" name='name' value={name} onChange={handleChange}/>
            <Input type="email" required placeholder="Email" name='email' value={email} onChange={handleChange}/>
            <Input type="password" required placeholder="Password" name='password' value={password} onChange={handleChange} />
            <Button type="submit" className='bg-blue-500 hover:bg-blue-600'>Register</Button>
        </form>
        <p>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Login</a></p>
        </div>
        
    </div>
  )
}

export default Register
