import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    React.useEffect(() => {
        const toggleButton = document.getElementById('toggleSidebar');

        if (toggleButton) {
          toggleButton.addEventListener('click', toggleSidebar);

          // Cleanup the event listener when the component unmounts
          return () => {
            toggleButton.removeEventListener('click', toggleSidebar);
          };
        }
    }, []);

    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

    useEffect(() => {
        // Retrieve the selected menu item from local storage on component mount
        const storedItem = localStorage.getItem('selectedMenuItem');
        if (storedItem) {
        setSelectedMenuItem(storedItem);
        document.getElementById('TextChangeMenu').innerText = storedItem;
        }
    }, []);

    const handleMenuItemClick = (id, text) => {
        setSelectedMenuItem(id);
        document.getElementById('TextChangeMenu').innerText = text;
        // Save the selected menu item to local storage
        localStorage.setItem('selectedMenuItem', id);
    };


    const [isActive, setIsActive] = useState(false);
    const [isOverlayHidden, setIsOverlayHidden] = useState(true);
    const [isMenuTranslated, setIsMenuTranslated] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleToggleClick = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
        setIsOverlayHidden(!isOverlayHidden);
        setIsMenuTranslated(!isMenuTranslated);
    };

    const handleOverlayClick = (e) => {
        e.preventDefault();
        setIsActive(true);
        setIsOverlayHidden(true);
        setIsMenuTranslated(true);
    };

    const handleDropdownToggleClick = (e, parent) => {
        e.preventDefault();

        if (selectedGroup === parent) {
        setSelectedGroup(null);
        } else {
        setSelectedGroup(parent);
        }
    };

    // Start: Dropdown Attendant
    const handleAttendanceToggle = () => {
        setIsAttendanceOpen(!isAttendanceOpen);
    };
    // End: Dropdown Attendant

    return (
        <>
            {/* start: Sidebar */}
            <div
                className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >



            {/* <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform"> */}
                <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover" />
                    <span className="text-lg font-bold text-white ml-3">Logo</span>
                </a>
                <ul className="mt-4">
                    <li className={`mb-1 group ${selectedMenuItem === 'Analytics' ? 'active' : ''}`}
                        id='Analytics'
                        onClick={() => handleMenuItemClick('Analytics', 'Analytics')}>
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                            <i className="ri-home-2-line mr-3 text-lg"></i>
                            <span className="text-sm">Analytics</span>
                        </a>
                    </li>
                    <li className={`mb-1 group ${selectedMenuItem === 'Teacher' ? 'active selected' : ''}`}
                        id='Teacher' onClick={() => handleMenuItemClick('Teacher', 'Teacher')}>
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                            <i className="ri-presentation-line mr-3 text-lg"></i>
                            <span className="text-sm">Teacher</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Active order</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Completed order</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Canceled order</a>
                            </li>
                        </ul>
                    </li>
                    <li className={`mb-1 group ${selectedMenuItem === 'Student' ? 'active selected' : ''}`}
                        id='Student' onClick={() => handleMenuItemClick('Student', 'Student')}>
                        <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                            <i className="ri-graduation-cap-line mr-3 text-lg"></i>
                            <span className="text-sm">Student</span>
                            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                        </a>
                        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Manage services</a>
                            </li>
                        </ul>
                    </li>
                    <li id='Attendance' className={`mb-1 group ${selectedMenuItem === 'Attendance' ? 'active selected' : ''}`} onClick={() => handleMenuItemClick('Attendance', 'Attendance')}>
                        <a href="#" className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 ${
                            isAttendanceOpen ? 'bg-gray-800 text-white' : ''
                            }`} onClick={handleAttendanceToggle}
                            >
                            <i className="ri-slideshow-line mr-3 text-lg"></i>
                            <span className="text-sm">Attendance</span>
                            <i
                                className={`ri-arrow-${isAttendanceOpen ? 'down' : 'right'}-s-line ml-auto`}
                            ></i>
                        </a>
                        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Manage services</a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Manage services</a>
                            </li>
                        </ul>
                        {/* <ul className={`pl-7 ${isAttendanceOpen ? 'block' : 'hidden'}`}>
                            <li>
                                <a
                                href="#"
                                className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                onClick={() => handleMenuItemClick('Student', 'Student')}
                                >
                                Student
                                </a>
                            </li>
                            <li>
                                <a
                                href="#"
                                className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                                onClick={() => handleMenuItemClick('Teacher', 'Teacher')}
                                >
                                Teacher
                                </a>
                            </li>
                        </ul> */}
                    </li>
                </ul>
            </div>


            {/* Overlay to close the sidebar on smaller screens */}
            {isSidebarOpen && (
                <div
                id='toggleSidebar'
                onClick={toggleSidebar}
                className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
                ></div>
            )}
            {/* <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div> */}
            {/* <!-- end: Sidebar --> */}
        </>
    );
}

export default Sidebar
