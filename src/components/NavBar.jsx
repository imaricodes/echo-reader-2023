import React, { useRef, useContext } from "react";
import { IonIcon } from "@ionic/react";
//TODO: UPDATE to use react-icons instead of ionicons
import { menuOutline } from "ionicons/icons";
import { closeOutline } from "ionicons/icons";
import { SessionContext } from "../contexts/SessionContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { sessionState, setSessionState, socket } = useContext(SessionContext);

  const menuToggleRef = useRef(null);

  const menuListRef = useRef(null);

  const handleMenu = () => {
    menuToggleRef.current.icon === menuOutline
      ? ((menuToggleRef.current.icon = closeOutline),
        menuListRef.current.classList.remove("hidden"))
      : ((menuToggleRef.current.icon = menuOutline),
        menuListRef.current.classList.add("hidden"));
  };

  const goHome = () => {
    console.log("goHome clicked");
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
          onClick={goHome}
        >
          Echo Reader<sup className="text-sm font-normal ml-2">beta</sup>
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
              <a
                href="#"
                className="text-xl  duration-200 hover:text-green-700"
              >
                About
              </a>
            </li>
            <li className=" mx-4 my-6 md:my-0">
              <NavLink
                to="instructions"
                className="text-xl duration-200 hover:text-green-700"
              >
                Instructions
              </NavLink>
              {/* <a href="#" className="text-xl duration-200 hover:text-green-700">
                Instructions
              </a> */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
