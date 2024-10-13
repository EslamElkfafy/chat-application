import { useParams, useNavigate } from "react-router-dom";
import ControlBar from "../components/ControlBar";
import MessageContainer from "../components/MessageContainer";
import SendMessage from "../components/SendMessage";
import { useAdminContext } from "../context/AdminContextProvider";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import { useOptionContext } from "../context/OptionContextProvider";
import { HeaderOfVoices } from "../components/HeaderOfVoices";
import axios from "axios";
import PrivataChatModal from "../components/_models/_profile/PrivataChatModal";
function Home() {
  const {user} = useUserContext();
  const {option} = useOptionContext();
  const router = useNavigate()
  const { roomId } = useParams();
  const { setAdmin } = useAdminContext();
  const { socket } = useSocketContext()
  const [voice, setVoice] = useState(false)
  // const [height, setHeight] = useState(window.innerHeight);
  const [listOfVoices, setListOfVoices] = useState<String[]>([])
  const [listOfVoicesChecker, setListOfVoicesChecker] = useState<boolean>(false)

  useEffect(()=>{
    if (!user) router('/')
    if(roomId == "admin-view" ) setAdmin(true);
    else setAdmin(false);
  },[user])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`rooms/${option.room._id}`)
        setListOfVoices(response.data.payload.placesOfVoices)
        setVoice(response.data.payload.voiceActive)
      } catch(e) {
        console.log(e)
      }
    }
    if (option.room)
      fetchData()
  }, [option.room, listOfVoicesChecker])
  useEffect(() => {
    if (option.room)
    {
      const handleSocket = (roomId: string) => {
        if (roomId === option.room._id)
          setListOfVoicesChecker((prev) => !prev)
      }
      socket.on("changeListOfVoices", handleSocket)
      return () => socket.off("changeListOfVoices", handleSocket)
    }
  },[option.room])
  if (user)
    return (
      <main className="w-full h-full bg-gray-50 relative flex flex-col" >
        <PrivataChatModal />
        {voice === true && <HeaderOfVoices listOfVoices={listOfVoices} setListOfVoices={setListOfVoices}/>}
        <MessageContainer voice={voice}/>
        <SendMessage/>
        <ControlBar/>
      </main>
    );
}


export default Home;
