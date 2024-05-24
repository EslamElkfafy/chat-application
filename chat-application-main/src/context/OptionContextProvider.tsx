import { createContext, useContext, useEffect, useState } from "react";

const OptionContext = createContext<any>({
  option: {},
  setOption: {},
});

const OptionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mic, setMic] = useState(false)
  const [voice, setVoice] = useState(false)
  const [room, setRoom] = useState(null)

  useEffect(() => {
    
  }, []);
  return (
    <OptionContext.Provider value={{ 
        option: {
            mic, 
            voice,
            room
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
