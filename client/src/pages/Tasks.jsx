import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Modal from "../components/ui/Modal.jsx";
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

  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("all");
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    {return task.status === filter}
  })

  const editChange = async (e, taskId) => {
  const newStatus = e.target.value;

  try {
    const res = await API.put(`/tasks/${taskId}`, {
      status: newStatus
    });
    console.log("Task updated:", res);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? res.data : task
      )
    );

  } catch (error) {
    console.log("Error updating task:", error);
  }
};

  const handleChange = (e) => {
    setNewTask({...newTask , [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newTask.deadline < new Date().toISOString().split('T')[0]){
      alert("Deadline cannot be in the past")
      return;
    }
    try {
        const res = await API.post('/tasks', {...newTask, project_id :projectId})
        setTasks((prev) => [...prev, res.data])
        setNewTask({title: "", description: "", status: "todo", priority: "medium", deadline: ""})
        setIsOpen(false);
      } catch (error) {
        console.log("Error creating task:", error);
    }
  }
  const deleteTask = async (taskId) => {
    try {
        const res = await API.delete(`/tasks/${taskId}`)
        setTasks(prev => prev.filter(task => task.id !== taskId))
        alert('Task deleted successfully')
    } catch (error) {
        console.log("Error deleting task:", error);
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
    <div className="flex flex-col bg-gray-100">
   <div className="flex flex-col  items-center md:items-start p-6">
    <p className="text-2xl font-semibold text-gray-900 mb-2">Tasks</p>
    <p className="text-gray-600 mb-4">Manage your tasks</p>
    <div className="flex gap-4 mb-6">
    <Button className="bg-blue-500" onClick={() => setIsOpen(true)}>Add Task</Button>
    <select value ={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
      <option value="all">All Tasks</option>
      <option value="todo">To Do</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>
    </div>
    </div>
        <div className="flex flex-col items-center md:items-start ">
      <h1 className = "text-2xl font-semibold text-gray-900 mb-2 md:mb-10">List of Tasks:</h1>
      {tasks.length === 0 ? (
        <Card>
  <div className="text-center py-10">
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No tasks yet
    </h3>

    <p className="text-gray-500">
      Create your first task for this project.
    </p>
  </div>
</Card>
      ) : (
        <div className="p-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Card  key={task.id}>
            <div  className = "p-4 justify-center  flex flex-col gap-3">
              <p className="font-semibold text-lg">{task.title}</p>
              <p className="text-gray-700">{task.description}</p>
              <select value={task.status} name="status" onChange={(e) => editChange(e, task.id)} className="border border-gray-300 w-1/2 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <p>Priority: {task.priority}</p>
              <p>Project name: {task.project_name}</p>
              <p>
                Deadline:{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "No deadline"}
              </p>
                <Button className="bg-red-500 md:w-1/3" onClick={() => deleteTask(task.id)}>Delete Task</Button>
            </div>
            </Card>
          ))}
        </div>
      )}
      </div>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
       <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-10">Add Task</h1>
      <div className=" p-6 w-full  ">
        <form  onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            name="title"
            required
            placeholder="Task title"
            value={newTask.title}
            onChange={handleChange}
            className="bg-white"
          />
          <Input 
            name="description"
            placeholder="Task description"
            value={newTask.description}
            onChange={handleChange}
            className="bg-white"
          />
          <select name="status" id="status" value={newTask.status} onChange={handleChange} className="border border-gray-300 bg-white  w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select name="priority" id="priority" value={newTask.priority} onChange={handleChange} className="border border-gray-300 bg-white w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Input
            type="date"
            name="deadline"
            required
            value={newTask.deadline}
            onChange={handleChange}
            className="bg-white"
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Add Task</Button>
        </form>
        </div>
        </div>
    </Modal>
    </div>
  );
};

export default Tasks;
