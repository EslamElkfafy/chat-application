import { Input } from "@chakra-ui/react";
import { LogOut, Send } from "lucide-react";
import EmojiModule from "./EmojiModule";
import { useState } from "react";
import { useUserContext } from "../context/UserContextProvider.tsx";
import { useSocketContext } from "../context/SocketContextProvider.tsx";



function SendMessage({setListOfMessage} : {setListOfMessage : (l : any) => void}) {
  const [message, setMessage] = useState("");
  const { user } = useUserContext();
  const { socket } = useSocketContext();
  
  const handleClick = () => 
    {
      if (message)
      {
        const tempMessage : any = {
          arrivalTime: Date.now(),
          description : message,
          img: user.img,
          name: user.name,
          fontColor: user.fontColor,
          nameColor: user.nameColor,
          backgroundColor: user.backgroundColor
        }
        setListOfMessage((previous : any) => ([...(previous.length === 21? previous.slice(1) : previous), tempMessage]))
        setMessage(""); 
        socket.emit("sent-event", tempMessage)
      }
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13)
    {
      handleClick()
    }
  }
  const handleClickLogout = () => 
    {
      window.localStorage.removeItem("user");
      window.location.reload();
    }
  return (
    <div className="flex gap-x-2 w-full items-center justify-between px-1">
      <div className="w-8 h-8 bg-blue-900 text-white p-1 flex justify-center items-center rounded-md cursor-pointer" onClick={handleClickLogout}>
        <LogOut size={"20px"} />
      </div>
      <EmojiModule text={message} setText={setMessage} />
      <Input
        size={"sm"}
        borderRadius={"5px"}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <div onClick={handleClick} className="h-8 px-1 py-2 flex justify-center items-center bg-blue-900 rounded-md text-white  cursor-pointer">
        <Send size={"30px"} />
        إرسال
      </div>
    </div>
  );
}

export default SendMessage;
