import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import { useState } from 'react'

const DashboardLayout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='flex min-h-screen'>
      <div className={`fixed md:static top-0 left-0  z-20 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 transition-transform duration-300 `}>
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div className='fixed inset-0 bg-black/50 md:hidden' onClick={() => setIsSidebarOpen(false)}>

        </div>
      )}
      <div className='flex flex-1 flex-col'> 
        <Navbar setIsSidebarOpen={setIsSidebarOpen}/>
        <main className='flex-1 bg-gray-100 p-6'>
        {children}
      </main>
      </div>
      
    </div>
  )
}

export default DashboardLayout
