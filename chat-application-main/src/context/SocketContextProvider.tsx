import { useContext, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "./UserContextProvider";
import { toast } from "react-toastify";
import ShapeAlert from "../components/ShapeAlert";
import {useOptionContext} from "./OptionContextProvider"

let hostname = import.meta.env.VITE_API_BASE_URL
const socketIo = io(hostname, {
  transports: ['websocket'],
  withCredentials: true,
});


const SocketContext = createContext<{
  socket: any;
}>({
    socket: socketIo
});

function SocketContextProvider({ children }: { children: React.ReactNode }) {
  const {user} = useUserContext()
  const [send, setSend] = useState(true)
  const {option} = useOptionContext()
  const [micBuild, setMicBuild] = useState(true)
  const [voiceBuild, setVoiceBuild] = useState(true)
  if (user && user._id != -1)
  {
    socketIo.on("disconnect", () => {
      location.reload()
    })
    socketIo.on("userStatus", () => {
      
      socketIo.emit("user", user)
    })
    if (send)
      {
        socketIo.on("recieve-info", (message : any, userId : any, fromUserId : any) => {
          if ((user._id === userId)) {
            toast.info(<ShapeAlert message={message} fromUserId={fromUserId}/>, 
            {
              containerId: 'stacked',
            })



          }
        })
        setSend(false)
      }
  }
  useEffect(() => {
    const asyncRecord = async () => {
      if (micBuild && option.mic && option.room)
      {
        let stream: any;
        try
        {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        } catch(e) {
          console.error('Error capturing audio.', e);
        }
        if (stream)
        {
          window.stream = stream
          const mediaRecorder = new MediaRecorder(stream);
          var audioChunks: any = [];
  
          mediaRecorder.addEventListener("dataavailable", function (event: any) {
              audioChunks.push(event.data);
          });
      
  
          mediaRecorder.addEventListener("stop", function () {
              var audioBlob = new Blob(audioChunks);
              audioChunks = [];
              var fileReader = new FileReader();
              fileReader.readAsDataURL(audioBlob);
              fileReader.onloadend = function () {
                  var base64String = fileReader.result;
                  socketIo.emit("audioStream", base64String, option.room._id);
              };
  
              mediaRecorder.start();
              setTimeout(function () {
                  mediaRecorder.stop();
              }, 1000);
          });
  
          mediaRecorder.start();
          setTimeout(function () {
              mediaRecorder.stop();
          }, 1000);
          setMicBuild(false)
        }
      }
      else if (!micBuild && !option.mic)
      {
        if (window.stream)
          window.stream.getTracks().forEach((track: any) => {
            track.stop()
          });
        setMicBuild(true)
      }
    }
    asyncRecord()
    
  },[option.mic, option.room])
  useEffect(() => {
    if (voiceBuild && option.voice)
    {
      socketIo.on('audioStream', (audioData : any) => {
        var newData = audioData.split(";");
        newData[0] = "data:audio/ogg;";
        newData = newData[0] + newData[1];
    
        var audio = new Audio(newData);
        if (!audio || document.hidden) {
            return;
        }
        audio.play();
      });
      setVoiceBuild(false)
    }
    else if (!voiceBuild && !option.voice)
    {
      socketIo.off('audioStream')
      setVoiceBuild(true)
    }
  }, [option.voice])
  return (
    <SocketContext.Provider value={{ socket: socketIo }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;


export const useSocketContext = () => {
    return useContext(SocketContext);
}