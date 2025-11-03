import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import Manager from './admin/Manager';
// import AdminPage from './admin/AdminPage';
import LoginPage from './User/login';
import NavBar from './Modules/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from './Modules/Home';
import Routing from './Modules/Routing';
import Map from './Modules/Map';
import React, { Suspense, lazy } from "react";
import Geocode from './Modules/Geocode';
const Login = lazy(() => import("./Modules/login"));
const Home = lazy(() => import("./Modules/Home"));
const AdminPage = lazy(() => import("./admin/AdminPage"))
//import Login from './Modules/login';

// function App() {
//   return (<>
//     <NavBar />
//     <Home />
//     {/* <Login /> */}
//     {/* <Geocode /> */}
//     {/* <Routing /> */}
//     {/* {<AdminPage />} */}
//     {/* <Map /> */}
//   </>
//   );
// }

// export default App;

// import React from "react";

// import Login from "./Login";
// import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<><NavBar /><Home /></>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}




