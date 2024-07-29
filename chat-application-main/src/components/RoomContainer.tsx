import { useEffect, useState } from "react";
import {  Mic, Lock, User } from "lucide-react";
import axios from "axios";
import { useOptionContext } from "../context/OptionContextProvider";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import { useListOfMessageContext } from "../context/ListOfMessageContext";

function RoomContainer({room} : {room: any}) {
  const [inRoom, setInRoom] = useState(99)
  const {option, setOption} = useOptionContext()
  const {user} = useUserContext()
  const {socket} = useSocketContext()
  const joinRoom = (roomId: string) => {
    if (window.stream)
    {
      window.stream.getTracks().forEach((track: any) => {
        track.stop()
      });
      setOption.setMic(false)
    }
    setOption.setRoom(room, user)
  }
  const handleOpen = (roomId: string) => {
    if (inRoom < room.visitors)
    {
      if (room.password)
      {
        const password = prompt("هذه الغرفة لها كلمة مرور ارجو كتابتها")
        if (password != room.password)
        {
          toast.error("كلمة مرور خاطئه", option.toastOptions)
          return
        }
      }
      joinRoom(roomId)
      // ابعت رساله انه دخل الغرفة
      
    } else {
      toast.error("هذه الغرفة مكتملة", option.toastOptions)
    }
  }

  useEffect(() => {
    const getRoomNum = async () => {
      try {
        const res = await axios.get("/socket/" + room._id)
        setInRoom(res.data)
      } catch(e) {
        console.error(e)
      }
    }
    const interval = setInterval(getRoomNum, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div className="flex justify-between items-center px-1 py-2" onClick={() => handleOpen(room._id)}>
        <div className="flex items-center gap-x-1">
          <img src={import.meta.env.VITE_API_BASE_URL + room.img} alt="logo" className="w-10 h-10" />
          <p className="text-lg font-semibold">{room.name}</p>
        </div>
        {room.password && 
          <div className="ms-auto">
            <Lock />
          </div>
        }
        <div className={"px-2 py-1 text-white text-sm flex items-center justify-center " + (room.voiceActive? "bg-red-500" : "bg-blue-500")}>
              {room.voiceActive?<Mic size={"18px"}/> : <User size={"18px"} />}
              {inRoom}/{room.visitors}
        </div>
      </div>
    </>
  );
}

export default RoomContainer;
