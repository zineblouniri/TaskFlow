import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState({
    id: null,
    name: "",
    description: "",
  });

  const editProject = (project) => {
    setEditingProject({
      id: project.id,
      name: project.name,
      description: project.description,
    });
  };

  const updateProject = async (e, projectId) => {
    e.preventDefault();
    try {
      const res = await API.put(`/projects/${projectId}`, {
        name: editingProject.name,
        description: editingProject.description,
      });

      setProjects((prev) =>
        prev.map((project) => (project.id === projectId ? res.data : project)),
      );
      setEditingProject({ id: null, name: "", description: "" });
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/projects", { name, description });
      console.log(res);
      setProjects((prev) => [...prev, res.data]);
      setName("");
      setDescription("");
    } catch (error) {
      alert("Failed to create project");
      console.log("Error creating project:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>

          <p className="text-gray-500 mt-1">Manage your projects and tasks</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Project</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            required
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 ">
            Add Project
          </Button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h1 className="text-gray-800 text-xl mb-3 font-semibold">Projects</h1>

        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/tasks/${project.id}`)}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                     {project.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    Created at:{" "}
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => deleteProject(project.id)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition"
                   >
                    delete
                  </Button>
                  <Button
                    onClick={() => editProject(project)}
                    className="flex-1 bg-red-500 hover:bg-red-600 transition"
                  >
                    update
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
        {editingProject && (
          <div className="gap-4 mb-3">
            <h1 className="text-gray-800 text-xl mb-3 font-semibold">Edit Project</h1>
            <form onSubmit={(e) => updateProject(e, editingProject.id)} 
                className="flex  items-center gap-2">
              <Input
                type="text"
                required
                placeholder="Title" 
                value={editingProject.name}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, name: e.target.value })
                }
              />
              <Input
                type="text"
                required
                placeholder="Description"
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
              />
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Update Project
              </Button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
