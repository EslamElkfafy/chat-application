import { useParams, useNavigate } from "react-router-dom";
import ControlBar from "../components/ControlBar";
import MessageContainer from "../components/MessageContainer";
import SendMessage from "../components/SendMessage";
import { useAdminContext } from "../context/AdminContextProvider";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
function Home({listOfMessage, setListOfMessage} : {listOfMessage: any, setListOfMessage: any}) {
  const {user} = useUserContext();
  const router = useNavigate()
  const { roomId } = useParams();
  const { setAdmin } = useAdminContext();
  const { socket } = useSocketContext()
  useEffect(()=>{
    if (!user) router('/')
    if(roomId == "admin-view" ) setAdmin(true);
    else setAdmin(false);
  },[])
  useEffect(() => {
    const interval = setInterval(() => {
      const userStorage = window.localStorage.getItem("user");
      if (!userStorage){
        router("/")
        socket.disconnect()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  if (user)
    return (
      <main className="w-full h-screen bg-gray-50">
        <MessageContainer listOfMessage = {listOfMessage} setListOfMessage={setListOfMessage}/>
        <SendMessage setListOfMessage = {setListOfMessage}/>
        {user._id !== -1 && <ControlBar setListOfMessage = {setListOfMessage}/>}
      </main>
    );
}


export default Home;
