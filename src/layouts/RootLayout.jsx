import { NavLink, Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";


const RootLayout = () => {
  return (

      <div className="root-layout">
        <NavBar/>
        <main>
          <Outlet />
        </main>
       
      </div>

  );
};

export default RootLayout;
