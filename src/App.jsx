import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import SiteWrapper from "./components/SiteWrapper";
import { SessionContextProvider } from "./contexts/SessionContext";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import MainContainer from "./components/MainContainer/MainContainer";
import Instructions from "./components/Instructions/Instructions";

//layout
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainContainer />} />
      <Route path="instructions" element={<Instructions />} />
    </Route>
  )
);

function App() {
  return (
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default App;
