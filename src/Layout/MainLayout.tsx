import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <h1>hello</h1>
      <Outlet/>
    </div>
  );
}

export default MainLayout;
