import { NavLink, Outlet } from "react-router-dom";
import BrowserWarningModal from "../components/Modals/BrowserWarningModal";
import NavBar from "../components/NavBar";


const RootLayout = () => {
  return (

      <div className="root-layout">
        <NavBar/>
        <main>
          <Outlet />
        </main>
        <BrowserWarningModal />
      </div>

  );
};

export default RootLayout;
