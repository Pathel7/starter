import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
  //const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className='text-blue-500'>
        side bar
      </div>
      {/* Body */}
      <main
          className="flex-1"         
        >
          <Outlet />
        </main>
    </div>
    
   
  );
};

export default MainLayout;

