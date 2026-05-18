import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {LayoutDashboard,CheckSquare} from "lucide-react"; 

const Sidebar = () => {
  const location = useLocation()
  return (
    <aside className='w-64 bg-gray-900 text-white p-5'>
        <h2 className='text-2xl font-bold mb-10'>TaskFlow</h2>
        <nav className='flex flex-col gap-4'>
            <Link to='/dashboard' className={`flex items-center gap-3 p-3 rounded-lg transition
                ${location.pathname === '/dashboard' ?
                  ' bg-gray-700' : 'hover:bg-gray-800'
                }`}>
                <LayoutDashboard size={20} />
                Dashboard
            </Link>

            
        </nav>
      
    </aside>
  )
}

export default Sidebar
