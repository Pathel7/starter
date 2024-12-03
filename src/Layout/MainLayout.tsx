import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 h-full bg-gray-800 text-white transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          <Button variant="ghost" className="text-left">
            Accueil
          </Button>
          <Button variant="ghost" className="text-left">
            Écoles
          </Button>
          <Button variant="ghost" className="text-left">
            Élèves
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <nav
          className="fixed top-0 left-0 z-10 flex items-center justify-between px-4 text-white bg-blue-500"
          style={{ height: '64px', width: '100%' }}
        >
          <div className="flex items-center space-x-4">
            <Button            
              variant="ghost"
              className="text-white"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? 'Fermer' : 'Menu'}
            </Button>
          </div>

          <div className="flex items-center mr-3 space-x-4">
            <span>Nom de l'utilisateur</span>
            <DropdownMenu >
              <DropdownMenuTrigger className="bg-transparent w-[72px] mr-5">
              <Button variant="ghost"  className="bg-gray-transparent">Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-800'>
                <DropdownMenuItem>Role</DropdownMenuItem>
                <DropdownMenuItem>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Body */}
        <main
          className="flex-1 p-4 overflow-y-auto"
          style={{ marginTop: '32px' }} // Décale le contenu pour éviter de chevaucher le Navbar
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

