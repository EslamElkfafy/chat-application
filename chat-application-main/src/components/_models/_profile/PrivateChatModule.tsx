import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import HeaderChatModule from "./HeaderChatModule";
import SendPrivateMessage from "../../SendPrivateMessage";
import { Profile_Items } from "../../../lib/utils";
import Message from "../../Message";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../../context/UserContextProvider";
import { useSocketContext } from "../../../context/SocketContextProvider";
import axios from "axios";
import PrivateMessage from "../../PrivateMessage";
import { toast } from "react-toastify";

function PrivateChatModule({toUserId} : {toUserId: any}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chat = Profile_Items[0];
  const input = useRef<HTMLInputElement>(null);
  const [ listOfPrivateMessages, setListOfPrivateMessages] = useState<any[]>([])
  const [ dataListOfPrivateMessages, setDataListOfPrivateMessages] = useState<any[]>([])
  const { user } = useUserContext()
  const { socket } = useSocketContext()
  const [chatId, setChatId] = useState("")
  const [ checkChat, setCheckChat ] = useState(false);

  useEffect(() => {
    input.current?.scrollIntoView({ behavior: "smooth" });
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/chats/messages/${chatId}`)
      setDataListOfPrivateMessages(response.data.messages)
    }
    if (chatId !== "")
      {
        fetchData()
      }
    
  }, [chatId]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/find/${toUserId}`);
      setCheckChat(response.data.chatBlock);
    }
    fetchData()
  }, [])
  socket.on("receive-room", (message : any) => {
    setListOfPrivateMessages([...listOfPrivateMessages, message])
  })
  const handleClick = async () => {
    if (checkChat === true) {
      toast.warning("هذا المستحدم قام بتعطيل المحادثات")
    } else {
      onOpen()
    const response = await axios.post("http://localhost:3000/api/chats/addchat", {
      user1: user._id,
      user2: toUserId
    })
    const chat_id = response.data._id;
    setChatId(chat_id)
    socket.emit('join-room', chat_id);
    await axios.put(`http://localhost:3000/api/users/updateprivate/${toUserId}`, { userId: user._id});
    }
    
  }
  return (
    <>
      <div
        className="border p-1 flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center"
        onClick={handleClick}
      >
        <chat.icon className="size-5" />
        {chat.text}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={"10px"}>
          <HeaderChatModule onClose_Module={onClose} toUserId={toUserId}/>
          <div className="flex flex-col h-[300px] overflow-auto">
            {dataListOfPrivateMessages.map((message, index) => (
              <div ref={input}>
                <PrivateMessage key={index} message= {message} />
              </div>
            ))}
            {listOfPrivateMessages.map((message, index) => (
              <div ref={input}>
                <PrivateMessage key={index} message= {message} />
              </div>
            ))}
          </div>
          <SendPrivateMessage chatId={chatId} listOfPrivateMessages= {listOfPrivateMessages} setListOfPrivateMessages = {setListOfPrivateMessages}/>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrivateChatModule;
