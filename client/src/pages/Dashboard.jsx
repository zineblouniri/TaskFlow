import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import ProjectForm from "../components/forms/ProjectForm.jsx";
import Modal from "../components/ui/Modal.jsx";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState({
    id: null,
    name: "",
    description: "",
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const editProject = (project) => {
    setEditingProject({
      id: project.id,
      name: project.name,
      description: project.description,
    });
    setIsEditModalOpen(true);
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
      setIsEditModalOpen(false);
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
      setIsCreateModalOpen(false);
    } catch (error) {
      alert("Failed to create project");
      console.log("Error creating project:", error);
    }
  };

  return (
    
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:justify-between items-center  gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800 text-center ">Projects</h1>

          <p className="text-gray-500 mt-1">Manage your projects and tasks</p>
        </div>
        <Button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 mb-4 "
      >
        Create Project
      </Button>
      </div>
      

      

      <Card className=" mb-8">
        <h1 className="text-gray-800 text-xl mb-3 font-semibold">Projects</h1>

        {projects.length === 0 ? (
          <Card>
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No projects yet
              </h3>

              <p className="text-gray-500">
                Create your first project to get started.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className=" hover:shadow-xl transition  duration-300 border border-gray-100"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/tasks/${project.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {project.name}
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Created at:{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mt-6">
                  <Button
                    onClick={() => deleteProject(project.id)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition "
                  >
                    delete
                  </Button>
                  <Button
                    onClick={() => editProject(project)}
                    className="flex-1 bg-red-500 hover:bg-red-600 transition "
                  >
                    update
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
<Modal
      isOpen={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
    >
      <ProjectForm
        title="Create Project"
        buttonText="Create Project"
        formData={{ name, description }}
        setFormData={({ name, description }) => {
          setName(name);
          setDescription(description);
        }}
        handleSubmit={handleSubmit}
        buttonColor="bg-blue-600 hover:bg-blue-700"
      />
    </Modal>

    <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <ProjectForm
        title="Edit Project"
        buttonText="Update Project"
        formData={editingProject}
        setFormData={(data) => setEditingProject(data)}
        handleSubmit={(e) => updateProject(e, editingProject.id)}
        buttonColor="bg-green-500 hover:bg-green-600"
      />
    </Modal>
      
    </DashboardLayout>
     
    
  
  );

 
};

export default Dashboard;
