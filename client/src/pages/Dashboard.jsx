import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios.js'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

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
    
  return (
    <div>
      <h1>Dashboard</h1>
        {projects.length === 0 ? <p>No projects found</p> : (
            <ul>
                {projects.map((project) => (
                    <li onClick={() => navigate(`/tasks/${project.id}`)} key={project.id}>
                        <h3>{project.name}</h3>
                        <p>Description: {project.description}</p>
                        <p>Created at: {new Date(project.created_at).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Dashboard
