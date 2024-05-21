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
axios.defaults.withCredentials = true;
let hostname = import.meta.env.VITE_API_BASE_URL + "api/"
// let hostname = "http://localhost:3000/api/"
console.log(hostname)
axios.defaults.baseURL = hostname
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useSocketContext } from "./context/SocketContextProvider";
import { useUserContext } from "./context/UserContextProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function App() {
  const { socket } = useSocketContext()
  const { user } = useUserContext()
  const [ send, setSend ] = useState(true)
  const router = useNavigate()
  const [listOfMessage, setListOfMessage] = useState([])
  
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e : any) => {
    e.preventDefault();
    e.returnValue = "";
    window.localStorage.removeItem("user");
  };
  // const { admin } = useAdminContext();
  return (
    <>
    <Routes>
      <Route path="/" element={<AuthPage setListOfMessage={setListOfMessage}/>} />
      <Route path="/:roomId" element={<Home listOfMessage={listOfMessage} setListOfMessage={setListOfMessage}/>} />
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
