
import "./App.css";
import BrowserWarningModal from "./components/Modals/BrowserWarningModal";
import { SessionContextProvider } from "./contexts/SessionContext";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// import { useHistory } from "react-router-dom"


//pages
import MainContainer from "./components/MainContainer/MainContainer";
import Instructions from "./components/Instructions/Instructions";
import About from "./components/About/About";

//layout
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainContainer />} />
      <Route path="instructions" element={<Instructions />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

function App() {
  return (
    <SessionContextProvider>
      <RouterProvider router={router} />
      <BrowserWarningModal/>
    </SessionContextProvider>
    
  );
}

export default App;
