import { createContext, useContext, useEffect, useState } from "react";
import { Bounce } from "react-toastify";
import axios from "axios";
import {useSocketContext} from './SocketContextProvider'

const OptionContext = createContext<any>({
  option: {},
  setOption: {},
});

const OptionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mic, setMic] = useState(false)
  const [voice, setVoice] = useState(false)
  const [room, setRoom] = useState(null)
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
  useEffect(() => {
    
  }, []);
  const setRoomCustom = (rm: any) => {
    if (!rm)
    {
      socket.emit("unjoin", rm)
      return setRoom(null)
    }
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
