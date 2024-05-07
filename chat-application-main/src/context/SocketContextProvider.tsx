import { useContext, createContext, useState } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "./UserContextProvider";
import { toast } from "react-toastify";
import ShapeAlert from "../components/ShapeAlert";

const socketIo = io("http://localhost:3001");


const SocketContext = createContext<{
  socket: any;
}>({
    socket: socketIo
});

function SocketContextProvider({ children }: { children: React.ReactNode }) {
  const {user} = useUserContext()
  const [send, setSend] = useState(true)
  if (user && user._id != -1)
  {
    socketIo.on("userStatus", () => {
      socketIo.emit("user", user)
      
    })
    if (send)
      {
        socketIo.on("recieve-info", (message : any, userId : any, fromUserId : any) => {
          if ((user._id === userId)) {
            toast(<ShapeAlert message={message} fromUserId={fromUserId}/>)



          }
        })
        setSend(false)
      }
  }

    
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