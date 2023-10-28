import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
    // Hide and show Sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    // Hide and show Sidebar


    // logout: function start
    const handleLogout = () => {
        window.location.href = '/';
    };
    // logout: function end

  return (
    <>
        <button type="button" className="text-lg text-gray-600 sidebar-toggle" onClick={toggleSidebar} id="toggleSidebar">
            <i className="ri-menu-line"></i>
        </button>
        <ul className="flex items-center text-sm ml-3">
            <li className="mr-2">
                <a href="#" className="text-gray-400 hover:text-gray-600 font-medium">Dashboard</a>
            </li>
            <li className="text-gray-600 mr-2 font-medium">/</li>
            <li className="text-gray-600 mr-2 font-medium" id='TextChangeMenu'>Analytics</li>
        </ul>

    </>
  )
}

export default Navbar
