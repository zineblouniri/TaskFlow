import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu } from "lucide-react";

const Navbar = ({setIsSidebarOpen}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
<button
  className="md:hidden "
  onClick={() => setIsSidebarOpen(true)}
>
  <Menu />
</button>
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>

    </header>
  );
}

export default Navbar
