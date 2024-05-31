import { Input, IconButton } from "@chakra-ui/react";
import { Send } from "lucide-react";
import EmojiModule from "./EmojiModule";
import { useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import {  Mic, MicOff, VolumeX, Volume2 } from "lucide-react";
import { useOptionContext } from "../context/OptionContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";

function SendRoomMessage({
  RoomId, 
  setListOfPrivateMessages, 
  listOfPrivateMessages} : {
    RoomId : any,  
    setListOfPrivateMessages : any, 
    listOfPrivateMessages : any
  }) 
{
  const [message, setMessage] = useState("");
  const { user } = useUserContext()
  const { socket } = useSocketContext()
  const {option, setOption} = useOptionContext()
  const handleClick = async () => {
    const tempMessage : any = {
      description : message,
      userId: user._id
    }
    let new_list = [...listOfPrivateMessages, tempMessage]
    socket.emit("send-room", tempMessage, RoomId)
    setListOfPrivateMessages(new_list)
    setMessage(""); 
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13)
    {
      handleClick()
    }
  }
  return (
    <div className="flex items-center gap-x-1 px-2 mt-2 ">
      <IconButton
        className="me-2"
        colorScheme={option.mic? "green": "gray"}
        aria-label="mic"
        icon={option.mic? <Mic size="1.3em"/> : <MicOff size="1.3em" color="#dd1313" />}
        onClick={() => setOption.setMic(!option.mic)}
      />
      <IconButton
        colorScheme={option.voice? "green": "gray"}
        aria-label="voice"
        icon={option.voice? <Volume2 size={20}/> : <VolumeX size={20} color="#dd1313" />}
        onClick={() => setOption.setVoice(!option.voice)}
      />
      <EmojiModule text={message} setText={setMessage} />
      <Input
        height={"28px"}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="cursor-pointer p-1 bg-blue-700  text-white flex text-xs items-center rounded" onClick={handleClick}>
        <Send size={"18px"} />
        إرسال
      </div>
    </div>
  );
}

export default SendRoomMessage;
