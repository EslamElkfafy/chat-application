import { Input } from "@chakra-ui/react";
import { Send, PhoneCallIcon } from "lucide-react";
import ShareButton from "./_elements/ShareButton";
import EmojiModule from "./EmojiModule";
import { useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import axios from "axios";

function SendPrivateMessage({chatId, setListOfPrivateMessages, listOfPrivateMessages} : {chatId : any,  setListOfPrivateMessages : any, listOfPrivateMessages : any}) {
  const [message, setMessage] = useState("");
  const { user } = useUserContext()
  const { socket } = useSocketContext()
  const handleClick = async () => {
    const tempMessage : any = {
      description : message,
      userId: user._id
    }
    let new_list = [...listOfPrivateMessages, tempMessage]
    socket.emit("send-room", tempMessage, chatId)
    await axios.put(`chats/messages/${chatId}`, {message: tempMessage})
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
      <ShareButton handleChange={() => {}}/>
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

export default SendPrivateMessage;
