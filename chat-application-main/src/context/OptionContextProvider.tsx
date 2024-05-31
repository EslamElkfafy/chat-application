import { createContext, useContext, useEffect, useState } from "react";
import { Bounce } from "react-toastify";

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
  useEffect(() => {
    
  }, []);
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
            setRoom
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
