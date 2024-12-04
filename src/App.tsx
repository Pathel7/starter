

import { Route, Routes } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import coreRoutes from './Routes';
import { Suspense } from 'react';
import {  Loader } from 'lucide-react';
import Home from './Pages/Home';
import Login from './Pages/authentification/Login';


function App() {


  return (
   <>
   <Routes>
    {/* routes de login */}       
       <Route path="/login" element={<Login/>} />
      
       <Route  element={<MainLayout />}>
         {/* <Route  element={<PrivateRoute/>}>    */}
         <Route index element={<Home/>}></Route>
           {/* zone des onglets pour Admin */}
           {coreRoutes.map((routes, index) => {
             const { path, component: Component } = routes;
             return (
               <Route
                 key={index}
                 path={path}
                 element={
                   <Suspense fallback={<Loader />}>
                     <Component />
                   </Suspense>
                 }
               />
             );
           })}
          

         {/* </Route> */}
       </Route>
       
     </Routes>

    </>
  )
}

export default App
