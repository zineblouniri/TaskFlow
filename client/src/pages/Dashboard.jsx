import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios.js'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getProjects = async () => {
        try {
            const res =await API.get('/projects')
            setProjects(res.data)
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    const [name , setName] = useState('')
    const [description , setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/projects', {name, description})
            console.log(res)
            setProjects((prev) => [...prev, res.data])
            setName('')
            setDescription('')
        } catch (error) {
            alert("Failed to create project");
            console.log("Error creating project:", error);
        }
    }
    
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" required placeholder="Title"  value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" required placeholder="Description"  value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Project</button>
        </form>
      </div>
      <div>
        <h2>Projects</h2>
      
      
        {projects.length === 0 ? <p>No projects found</p> : (
            <ul>
                {projects.map((project) => (
                    <li style={{ cursor: "pointer" }} onClick={() => navigate(`/tasks/${project.id}`)} key={project.id}>
                        <h3>{project.name}</h3>
                        <p>Description: {project.description}</p>
                        <p>Created at: {new Date(project.created_at).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        )}
       </div> 
    </div>
  )
}

export default Dashboard
