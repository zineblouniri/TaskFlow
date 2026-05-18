import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col'> 
        <Navbar />
        <main className='flex-1 bg-gray-100 p-6'>
        {children}
      </main>
      </div>
      
    </div>
  )
}

export default DashboardLayout
