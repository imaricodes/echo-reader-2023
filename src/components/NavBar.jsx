import React, { useRef, useContext, useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
//TODO: UPDATE to use react-icons instead of ionicons
import { menuOutline } from "ionicons/icons";
import { closeOutline } from "ionicons/icons";
import { SessionContext } from "../contexts/SessionContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const { sessionState, setSessionState, socket } = useContext(SessionContext);

  const [currentLocation, setCurrentLocation] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const menuToggleRef = useRef(null);
  const menuListRef = useRef(null);

  // useEffect(() => {

  //   if (localStorage.getItem("currentLocation" !== null)) {
  //     console.log("initial check for local storage location return true");
  //     setCurrentLocation(localStorage.getItem("currentLocation"));
  //     navigate(localStorage.getItem("currentLocation"));
  //   } else {
  //     console.log("initial check for local storage location return false");
  //     setCurrentLocation("/");
  //     localStorage.setItem(
  //       "currentLocation",
  //       JSON.stringify(location.pathname)
  //     );
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("currentSessionState", JSON.stringify(sessionState));
  }, [sessionState]);

  const handleMenu = () => {
    menuToggleRef.current.icon === menuOutline
      ? ((menuToggleRef.current.icon = closeOutline),
        menuListRef.current.classList.remove("hidden"))
      : ((menuToggleRef.current.icon = menuOutline),
        menuListRef.current.classList.add("hidden"));
  };

  const handleLogoClick = () => {
    console.log("handleLogoClick clicked");
    // setCurrentLocation("/");
    if (socket) {
      if (sessionState === "listen") {
        socket.emit("cancel_session", "cancel_session from navbar logo click");
        setSessionState("go");
      } else setSessionState("go");
    } else setSessionState("go");
  };

  return (
    <header>
      <nav className="navbar relative mb-8 min-w-[320px] sm:mb-10 md:mb-12 md:flex md:justify-between lg:mb-16 xl:mb-20 ">
        {/* Logo */}

        <NavLink
          to="/"
          className="flex  cursor-pointer items-center px-4 pt-4 text-4xl font-bold md:px-14 "
          onClick={handleLogoClick}
        >
          Echo Reader<sup className="ml-2 text-sm font-normal">beta</sup>
        </NavLink>

        {/* Hanburger Menu */}
        <div className="absolute right-3 top-5 z-10 block cursor-pointer text-3xl md:hidden">
          <IonIcon
            icon={menuOutline}
            onClick={handleMenu}
            ref={menuToggleRef}
          />
        </div>

        {/* Links */}
        <div
          ref={menuListRef}
          className=" absolute  top-0 hidden h-screen w-full bg-white  pt-4 md:relative md:flex   md:h-auto md:w-auto md:pr-0"
        >
          <ul className=" flex flex-col text-center font-semibold md:flex md:flex-row md:items-center md:pr-14 ">
            <li className="mx-4 my-6 md:my-0 ">
              <NavLink
                to="/"
                className="text-xl  duration-200 hover:text-green-700"
              >
                Home
              </NavLink>
            </li>
            <li className="mx-4 my-6 md:my-0 ">
              <NavLink
                to="about"
                className="text-xl  duration-200 hover:text-green-700"
              >
                About
              </NavLink>
            </li>
            <li className=" mx-4 my-6 md:my-0">
              <NavLink
                to="instructions"
                className="text-xl duration-200 hover:text-green-700"
              >
                Instructions
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
