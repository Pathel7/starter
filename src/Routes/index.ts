import { lazy } from 'react';

// les routes de l'Admin
//const AdminHome = lazy(()=>import('./../Pages/adminPages/AdminHome'));
const Register = lazy(()=>import('./../Pages/adminPages/Register'));
const User = lazy(()=>import('./../Pages/adminPages/User'));
const Home = lazy(()=>import('./../Pages/Home'));
const Parametre = lazy(()=>import('./../Pages/Parametre'));

//les routes du parent
//const ParentHome =  lazy(()=>import('./../Pages/parentPages/ParentHome'));

//les routes de l'eleve
//const eleveHome =  lazy(()=>import('./../Pages/elevePages/EleveHome'));

//les routes du professeur
//const ProfesseurHome =  lazy(()=>import('./../Pages/professeurPages/ProfeseurHome'));






const coreRoutes = [
  {
    path: '/',
    title: 'Acceuil',
    component: Home,
  },
  {
    path: '/:type',
    title: 'Acceuil',
    component: Home,
  },
  
  {
    path: '/register',
    title: 'enregistrement',
    component: Register,
  },
  {
    path: '/users',
    title: 'profil',
    component: User,
  },
  {
    path: '/parametre',
    title: 'parametre',
    component: Parametre,
  },

];
export default coreRoutes