import { createContext, useContext, useEffect, useState } from "react";
import { Bounce } from "react-toastify";
import {useSocketContext} from './SocketContextProvider'
import { useListOfMessageContext } from "./ListOfMessageContext";
import axios from "axios";
import { useUserContext } from "./UserContextProvider";

const OptionContext = createContext<any>({
  option: {},
  setOption: {},
});

const OptionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mic, setMic] = useState(false)
  const [voice, setVoice] = useState(false)
  const [room, setRoom] = useState<any>(null)
  const {setUser} = useUserContext()
  const {setListOfMessage} = useListOfMessageContext()
  const [supportedFiles, _] = useState(['video/mp4', 'audio/mpeg', 'image/webp', 'image/jpeg', 'image/gif', 'image/png'])
  const [toastOptions, __] = useState({
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  })
  const {socket} = useSocketContext()

  const setRoomCustom = (rm: any, user: any) => {
    if ((room && rm && room._id === rm._id)) return
    let tempMessage : any = {
      arrivalTime: Date.now(),
      img: user.img,
      name: user.name,
      fontColor: user.fontColor,
      nameColor: user.nameColor,
      backgroundColor: user.backgroundColor,
      userId: user._id
    }
    if (room)
    {
      console.log("leave >>>" + room._id!)
      socket.emit("leave-room", room._id!)
      if (!rm)
      {
        tempMessage = {...tempMessage, 
          type: 'signout',
        }
        socket.emit("send-room", tempMessage, room._id)
        setListOfMessage((previous : []) => ([...(previous.length === 21? previous.slice(1) : previous), tempMessage]))
        axios.put("users/" + user._id, {room: null})
      }
    }
    if (rm)
      {
        socket.emit("join-room", rm._id)
         tempMessage  = {
          ...tempMessage,
          type: 'signin',
          room: rm,
        }
        socket.emit("send-room", tempMessage, rm._id)
        
        if (room)
        {
          socket.emit("send-room", {...tempMessage, 
            type: 'rejoin',
          }, room._id)
        }
        const helloMessage = {
          arrivalTime: Date.now(),
          img: rm.img,
          name: rm.name,
          type: "hello",
          description: !rm.withoutNotification && rm.helloMessage
        }
        setListOfMessage((previous : []) => ([...(previous.length === 21? previous.slice(1) : previous), tempMessage, helloMessage]))
      }
      axios.put("users/" + user._id, {room: rm? rm._id : null}).then((res) => {
        setUser((prev: any) => ({...prev, room: rm? rm._id : null}))
      })
      return setRoom(rm)
    }

  return (
    <OptionContext.Provider value={{ 
        option: {
            mic, 
            voice,
            room,
            supportedFiles,
            toastOptions
        }, 
        setOption: {
            setMic, 
            setVoice,
            setRoom: setRoomCustom
        } 
    }}>
      {children}
    </OptionContext.Provider>
  );
};

export default OptionContextProvider;

export const useOptionContext = () => {
  return useContext(OptionContext);
};
