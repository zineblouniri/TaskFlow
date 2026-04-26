import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios.js";
const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    deadline: ""
  })

  const handleChange = (e) => {
    setNewTask({...newTask , [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await API.post('/tasks', {...newTask, project_id :projectId})
        setTasks((prev) => [...prev, res.data])
        setNewTask({title: "", description: "", status: "todo", priority: "medium", deadline: ""})
    } catch (error) {
        console.log("Error creating task:", error);
    }
  }
  const getTasks = async () => {
    try {
      const res = await API.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    getTasks();
  }, [projectId]);
  return (
    <div>
        <form  onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            required
            placeholder="Task title"
            value={newTask.title}
            onChange={handleChange}
          />
          <textarea 
            name="description"
            placeholder="Task description"
            value={newTask.description}
            onChange={handleChange}
          />
          <select name="status" id="status" value={newTask.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select name="priority" id="priority" value={newTask.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={handleChange}
          />
          <button type="submit">Add Task</button>
        </form>
      <h1>Tasks for project {projectId}</h1>
      {tasks.length === 0 ? (
        <p>No tasks found for this project</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>
                Deadline:{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "No deadline"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
