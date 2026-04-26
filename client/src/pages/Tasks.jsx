import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios.js";
const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = React.useState([]);
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
