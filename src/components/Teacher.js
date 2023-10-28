import React from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Teacher = () => {
  return (
    <>
      {/* <Sidebar /> */}

      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">

          {/* Navbar Start */}
            <Navbar />
          {/* Navbar End */}

        </div>
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2 m-6">
          <div className=''>
            <h1>Hi</h1>
          </div>
        </div>
      </main>
    </>
  )
}

export default Teacher
