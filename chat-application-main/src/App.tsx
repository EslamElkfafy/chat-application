import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./context/UserContextProvider";
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
import Messages from "./pages/admin/Messages";
import Abbreviations from "./pages/admin/Abbreviations";
import Subscriptions from "./pages/admin/Subscriptions";

function App() {
  return (
    <Routes>
      <Route path="/"  >
        <Route index element={<AuthPage />} />
        {
          // user && 
          // user.role === 'admin' && 
          <Route path="admin-view" element= {<AdminLayout />} >
            <Route index  element = {<Navigate to="/admin-view/record" replace/>} />
            <Route path="record" element= {<Records />} />
            <Route path="permissions" element= {<Permission />} />
            <Route path="users" element= {<Users />} />
            <Route path="rooms" element= {<Romms />} />
            <Route path="control" element= {<Control />} />
            <Route path="status" element= {<Status />} />
            <Route path="block" element= {<Block />} />
            <Route path="filter" element= {<Filter />} />
            <Route path="messages" element= {<Messages />} />
            <Route path="abbreviations" element= {<Abbreviations />} />
            <Route path="subscriptions" element= {<Subscriptions />} />
          </Route>
        }
        <Route path=":roomId" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
