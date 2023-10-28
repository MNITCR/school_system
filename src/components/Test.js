import React, { useState } from 'react';

const Test = () => {
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

  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
        {/* Your logo here */}
        <ul className="mt-4">
          {/* Dashboard */}
          <li className={`mb-1 group ${selectedGroup === 'dashboard' ? 'selected' : ''}`}>
            <a
              href="#"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </a>
          </li>

          {/* Orders */}
          <li className={`mb-1 group ${selectedGroup === 'orders' ? 'selected' : ''}`}>
            <a
              href="#"
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle`}
              onClick={(e) => handleDropdownToggleClick(e, 'orders')}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <span className="text-sm">Orders</span>
              <i className={`ri-arrow-right-s-line ml-auto ${selectedGroup === 'orders' ? 'rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${selectedGroup === 'orders' ? 'block' : 'hidden'}`}>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Active order
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Completed order
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Canceled order
                </a>
              </li>
            </ul>
          </li>

          {/* Services */}
          <li className={`mb-1 group ${selectedGroup === 'services' ? 'selected' : ''}`}>
            <a
              href="#"
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle`}
              onClick={(e) => handleDropdownToggleClick(e, 'services')}
            >
              <i className="ri-flashlight-line mr-3 text-lg"></i>
              <span className="text-sm">Services</span>
              <i className={`ri-arrow-right-s-line ml-auto ${selectedGroup === 'services' ? 'rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${selectedGroup === 'services' ? 'block' : 'hidden'}`}>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Manage services
                </a>
              </li>
            </ul>
          </li>

          {/* Settings */}
          <li className={`mb-1 group ${selectedGroup === 'settings' ? 'selected' : ''}`}>
            <a
              href="#"
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100`}
            >
              <i className="ri-settings-2-line mr-3 text-lg"></i>
              <span className="text-sm">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Test;
