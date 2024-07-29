import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
// import { useAdminContext } from "./context/AdminContextProvider";
import AdminLayout from "./layouts/AdminLayout";
import Records from "./pages/admin/Records";
import Permission from "./pages/admin/Permission";
import Users from "./pages/admin/Users";
import Romms from "./pages/admin/Romms";
import Control from "./pages/admin/Control";
import Status from "./pages/admin/Status";
import Block from "./pages/admin/Block";
import Filter from "./pages/admin/Filter";
import axios from 'axios';
axios.defaults.withCredentials = true
let hostname = import.meta.env.VITE_API_BASE_URL + "api/"
// let hostname = "http://localhost:3000/api/"
console.log(hostname)
axios.defaults.baseURL = hostname
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/:roomId" element={<Home />} />
      <Route
        path="/admin-view/record"
        element={<AdminLayout children={<Records />} />}
      />
      <Route
        path="/admin-view/permissions"
        element={<AdminLayout children={<Permission />} />}
      />
      <Route
        path="/admin-view/users"
        element={<AdminLayout children={<Users />} />}
      />
      <Route
        path="/admin-view/rooms"
        element={<AdminLayout children={<Romms />} />}
      />
      <Route
        path="/admin-view/control"
        element={<AdminLayout children={<Control />} />}
      />
      <Route
        path="/admin-view/status"
        element={<AdminLayout children={<Status />} />}
      />
      <Route
        path="/admin-view/block"
        element={<AdminLayout children={<Block/>}/>} 
      />
      <Route
        path="/admin-view/filter"
        element={<AdminLayout children={<Filter/>}/>}
      />
    </Routes>
    </>
    
  );
}

export default App;
