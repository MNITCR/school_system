import React, { useEffect, useRef , useState} from 'react';
import Chart from 'chart.js/auto';
import { createPopper } from '@popperjs/core';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Teacher from '../../components/Teacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Navbar from './../../components/Navbar';

// components

export default function Dashboard() {
    const mainRef = useRef(null);
    const sidebarToggleRef = useRef(null);
    const sidebarOverlayRef = useRef(null);
    const sidebarMenuRef = useRef(null);

    useEffect(() => {
        const popperInstance = {};

        // start: Sidebar
        const sidebarToggle = sidebarToggleRef.current;
        const sidebarOverlay = sidebarOverlayRef.current;
        const sidebarMenu = sidebarMenuRef.current;
        const main = mainRef.current;

        if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.preventDefault();
            main.classList.toggle('active');
            sidebarOverlay.classList.toggle('hidden');
            sidebarMenu.classList.toggle('-translate-x-full');
        });
        }

        if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function (e) {
            e.preventDefault();
            main.classList.add('active');
            sidebarOverlay.classList.add('hidden');
            sidebarMenu.classList.add('-translate-x-full');
        });
        }

        if (sidebarMenu) {
        document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (item) {
            item.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = item.closest('.group');
            if (parent.classList.contains('selected')) {
                parent.classList.remove('selected');
            } else {
                document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (i) {
                i.closest('.group').classList.remove('selected');
                });
                parent.classList.add('selected');
            }
            });
        });
        }
        // end: Sidebar

        // start: Popper
        document.querySelectorAll('.dropdown').forEach(function (item, index) {
        const popperId = 'popper-' + index;
        const toggle = item.querySelector('.dropdown-toggle');
        const menu = item.querySelector('.dropdown-menu');
        menu.dataset.popperId = popperId;

        popperInstance[popperId] = createPopper(toggle, menu, {
            modifiers: [
            {
                name: 'offset',
                options: {
                offset: [0, 8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                padding: 24,
                },
            },
            ],
            placement: 'bottom-end',
        });
        });

        document.addEventListener('click', function (e) {
        const toggle = e.target.closest('.dropdown-toggle');
        const menu = e.target.closest('.dropdown-menu');
        if (toggle) {
            const menuEl = toggle.closest('.dropdown').querySelector('.dropdown-menu');
            const popperId = menuEl.dataset.popperId;
            if (menuEl.classList.contains('hidden')) {
            hideDropdown();
            menuEl.classList.remove('hidden');
            showPopper(popperId);
            } else {
            menuEl.classList.add('hidden');
            hidePopper(popperId);
            }
        } else if (!menu) {
            hideDropdown();
        }
        });

        function hideDropdown() {
        document.querySelectorAll('.dropdown-menu').forEach(function (item) {
            item.classList.add('hidden');
        });
        }

        function showPopper(popperId) {
        popperInstance[popperId].setOptions(function (options) {
            return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
            };
        });
        popperInstance[popperId].update();
        }

        function hidePopper(popperId) {
        popperInstance[popperId].setOptions(function (options) {
            return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
            };
        });
        }
        // end: Popper
    }, []); // Run this effect once when the component mounts

    // start: Tab
    useEffect(() => {
        document.querySelectorAll('[data-tab]').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const tab = item.dataset.tab;
            const page = item.dataset.tabPage;
            const target = document.querySelector('[data-tab-for="' + tab + '"][data-page="' + page + '"]');
            document.querySelectorAll('[data-tab="' + tab + '"]').forEach(function (i) {
            i.classList.remove('active');
            });
            document.querySelectorAll('[data-tab-for="' + tab + '"]').forEach(function (i) {
            i.classList.add('hidden');
            });
            item.classList.add('active');
            target.classList.remove('hidden');
        });
        });
    }, []); // Run this effect once when the component mounts
    // end: Tab

    // start: Chart
    //   useEffect(() => {
    //     new Chart(document.getElementById('order-chart'), {
    //       type: 'line',
    //       data: {
    //         labels: generateNDays(7),
    //         datasets: [
    //           {
    //             label: 'Active',
    //             data: generateRandomData(7),
    //             borderWidth: 1,
    //             fill: true,
    //             pointBackgroundColor: 'rgb(59, 130, 246)',
    //             borderColor: 'rgb(59, 130, 246)',
    //             backgroundColor: 'rgb(59 130 246 / .05)',
    //             tension: 0.2,
    //           },
    //           {
    //             label: 'Completed',
    //             data: generateRandomData(7),
    //             borderWidth: 1,
    //             fill: true,
    //             pointBackgroundColor: 'rgb(16, 185, 129)',
    //             borderColor: 'rgb(16, 185, 129)',
    //             backgroundColor: 'rgb(16 185 129 / .05)',
    //             tension: 0.2,
    //           },
    //           {
    //             label: 'Canceled',
    //             data: generateRandomData(7),
    //             borderWidth: 1,
    //             fill: true,
    //             pointBackgroundColor: 'rgb(244, 63, 94)',
    //             borderColor: 'rgb(244, 63, 94)',
    //             backgroundColor: 'rgb(244 63 94 / .05)',
    //             tension: 0.2,
    //           },
    //         ],
    //       },
    //       options: {
    //         scales: {
    //           y: {
    //             beginAtZero: true,
    //           },
    //         },
    //       },
    //     });
    //   }, []);

    //   function generateNDays(n) {
    //     const data = [];
    //     for (let i = 0; i < n; i++) {
    //       const date = new Date();
    //       date.setDate(date.getDate() - i);
    //       data.push(
    //         date.toLocaleString('en-US', {
    //           month: 'short',
    //           day: 'numeric',
    //         })
    //       );
    //     }
    //     return data;
    //   }

    //   function generateRandomData(n) {
    //     const data = [];
    //     for (let i = 0; i < n; i++) {
    //       data.push(Math.round(Math.random() * 10));
    //     }
    //     return data;
    //   }
    // end: Chart

    return (
        <>
            {/* Sidebar Start*/}
                <Sidebar />
            {/* Sidebar Start End*/}



            {/* <!-- start: Main --> */}
            <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">

                    {/* Navbar Start */}
                        <Navbar />
                    {/* Navbar End */}

                    <ul className="ml-auto flex items-center">
                        <li className="mr-1 dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600">
                                <i className="ri-search-line"></i>
                            </button>
                            <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                                <form action="" className="p-4 border-b border-b-gray-100">
                                    <div className="relative w-full">
                                        <input type="text" className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500" placeholder="Search..." />
                                        <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                </form>
                                <div className="mt-3 mb-2">
                                    <div className="text-[13px] font-medium text-gray-400 ml-4 mb-2">Recently</div>
                                    <ul className="max-h-64 overflow-y-auto">
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">Create landing page</div>
                                                    <div className="text-[11px] text-gray-400">$345</div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600">
                                <i className="ri-notification-3-line"></i>
                            </button>
                            <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                                <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                                    <button type="button" data-tab="notification" data-tab-page="notifications" className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications</button>
                                    <button type="button" data-tab="notification" data-tab-page="messages" className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages</button>
                                </div>
                                <div className="my-2">
                                    <ul className="max-h-64 overflow-y-auto" data-tab-for="notification" data-page="notifications">
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                                    <div className="text-[11px] text-gray-400">from a user</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                                    <div className="text-[11px] text-gray-400">from a user</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                                    <div className="text-[11px] text-gray-400">from a user</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                                    <div className="text-[11px] text-gray-400">from a user</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">New order</div>
                                                    <div className="text-[11px] text-gray-400">from a user</div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="max-h-64 overflow-y-auto hidden" data-tab-for="notification" data-page="messages">
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="py-2 px-4 flex items-center hover:bg-gray-50 group">
                                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                                                <div className="ml-2">
                                                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">John Doe</div>
                                                    <div className="text-[11px] text-gray-400">Hello there!</div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        {/* <li className="dropdown ml-3">
                            <button type="button" className="dropdown-toggle flex items-center">
                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle" />
                            </button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <Link to="/" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50" onClick={handleLogout}>Logout</Link>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                            <div className="flex justify-between mb-6">
                                <div>
                                    <div className="text-2xl font-semibold mb-1">10</div>
                                    <div className="text-sm font-medium text-gray-400">Active orders</div>
                                </div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-full bg-gray-100 rounded-full h-4">
                                    <div className="h-full bg-blue-500 rounded-full p-1" style={{ width: "60%"}}>
                                        <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 ml-4">60%</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <div className="flex items-center mb-1">
                                        <div className="text-2xl font-semibold">324</div>
                                        <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">+30%</div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">Visitors</div>
                                </div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full object-cover block" />
                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full object-cover block -ml-3" />
                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full object-cover block -ml-3" />
                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full object-cover block -ml-3" />
                                <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full object-cover block -ml-3" />
                            </div>
                        </div>
                        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                            <div className="flex justify-between mb-6">
                                <div>
                                    <div className="text-2xl font-semibold mb-1"><span className="text-base font-normal text-gray-400 align-top">&dollar;</span>2,345</div>
                                    <div className="text-sm font-medium text-gray-400">Active orders</div>
                                </div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <a href="#" className="text-blue-500 font-medium text-sm hover:text-blue-600">View details</a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                            <div className="flex justify-between mb-4 items-start">
                                <div className="font-medium">Manage orders</div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center mb-4 order-tab">
                                <button type="button" data-tab="order" data-tab-page="active" className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tl-md rounded-bl-md hover:text-gray-600 active">Active</button>
                                <button type="button" data-tab="order" data-tab-page="completed" className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">Completed</button>
                                <button type="button" data-tab="order" data-tab-page="canceled" className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tr-md rounded-br-md hover:text-gray-600">Canceled</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[540px]" data-tab-for="order" data-page="active">
                                    <thead>
                                        <tr>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Budget</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="w-full min-w-[540px] hidden" data-tab-for="order" data-page="completed">
                                    <thead>
                                        <tr>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Budget</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="w-full min-w-[540px] hidden" data-tab-for="order" data-page="canceled">
                                    <thead>
                                        <tr>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Budget</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                            <div className="flex justify-between mb-4 items-start">
                                <div className="font-medium">Manage Services</div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <form action="" className="flex items-center mb-4">
                                <div className="relative w-full mr-2">
                                    <input type="text" className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500" placeholder="Search..." />
                                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                                </div>
                                <select className="text-sm py-2 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]">
                                    <option value="">All</option>
                                </select>
                            </form>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[540px]">
                                    <thead>
                                        <tr>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Price</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Clicks</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">1K</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><i className="ri-more-2-fill"></i></button>
                                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">1K</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><i className="ri-more-2-fill"></i></button>
                                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">1K</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><i className="ri-more-2-fill"></i></button>
                                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">1K</span>
                                            </td>
                                            {/* <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><i className="ri-more-2-fill"></i></button>
                                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                        </li>
                                                        <li>
                                                            <Link to="/" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50" onClick={handleLogout}>Logout</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td> */}
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-gray-400">1K</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><i className="ri-more-2-fill"></i></button>
                                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                            <div className="flex justify-between mb-4 items-start">
                                <div className="font-medium">Order Statistics</div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                <div className="rounded-md border border-dashed border-gray-200 p-4">
                                    <div className="flex items-center mb-0.5">
                                        <div className="text-xl font-semibold">10</div>
                                        <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                                    </div>
                                    <span className="text-gray-400 text-sm">Active</span>
                                </div>
                                <div className="rounded-md border border-dashed border-gray-200 p-4">
                                    <div className="flex items-center mb-0.5">
                                        <div className="text-xl font-semibold">50</div>
                                        <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                                    </div>
                                    <span className="text-gray-400 text-sm">Completed</span>
                                </div>
                                <div className="rounded-md border border-dashed border-gray-200 p-4">
                                    <div className="flex items-center mb-0.5">
                                        <div className="text-xl font-semibold">4</div>
                                        <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                                    </div>
                                    <span className="text-gray-400 text-sm">Canceled</span>
                                </div>
                            </div>
                            <div>
                                <canvas id="order-chart"></canvas>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                            <div className="flex justify-between mb-4 items-start">
                                <div className="font-medium">Earnings</div>
                                <div className="dropdown">
                                    <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[460px]">
                                    <thead>
                                        <tr>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
                                            <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <div className="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="text-[13px] font-medium text-rose-500">-$235</span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-b-gray-50">
                                                <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <!-- end: Main --> */}


            {/* Teacher Start */}
                <Teacher />
            {/* Teacher Start */}
            <script src="https://unpkg.com/@popperjs/core@2"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </>
    );
}
