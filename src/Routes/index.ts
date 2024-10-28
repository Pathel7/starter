import { lazy } from 'react';





// les composants de la configuration
const Home = lazy(()=>import('./../Pages/basics/Home'))
const Parametre= lazy(()=>import('@/Pages/basics/Parametre'))
const Profil= lazy(()=>import('@/Pages/basics/Profil'))
const Member = lazy(()=>import("@/Pages/basics/Members"))




const coreRoutes = [
  {
    path: '/',
    title: 'Acceuil',
    component: Home,
  },
  {
    path: '/members',
    title: 'membre',
    component: Member,
  },
  {
    path: '/profil',
    title: 'profil',
    component: Profil,
  },
  {
    path: '/parametre',
    title: 'Fiche de Livraisons',
    component: Parametre,
  },

];
export default coreRoutes