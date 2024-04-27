import { useParams, useNavigate } from "react-router-dom";
import ControlBar from "../components/ControlBar";
import MessageContainer from "../components/MessageContainer";
import SendMessage from "../components/SendMessage";
import { useAdminContext } from "../context/AdminContextProvider";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContextProvider";

function Home() {
  const {user} = useUserContext();
  const router = useNavigate()
  const { roomId } = useParams();
  const { setAdmin } = useAdminContext();
  const [listOfMessage, setListOfMessage] = useState([])
  useEffect(()=>{
    if (!user) router('/')
    if(roomId == "admin-view" ) setAdmin(true);
    else setAdmin(false);
  },[])
  if (user)
    return (
      <main className="w-full h-screen bg-gray-50">
        <MessageContainer listOfMessage = {listOfMessage} setListOfMessage={setListOfMessage}/>
        <SendMessage setListOfMessage = {setListOfMessage}/>
        <ControlBar />
      </main>
    );
}


export default Home;
