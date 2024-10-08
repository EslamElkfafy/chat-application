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
import { getColor } from "../../../lib/getColor";

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
    const fetchData = async () => {
      const response = await axios.get(`users/find/${toUserId}`);
      setCheckChat(response.data.chatBlock);
    }
    fetchData()
  }, [])
  useEffect(() => {
    input.current?.scrollIntoView({ behavior: "smooth" });
    const fetchData = async () => {
      const response = await axios.get(`chats/messages/${chatId}`)
      setDataListOfPrivateMessages(response.data.messages)
    }
    if (chatId !== "")
      {
        fetchData()
      }
    
  }, [chatId]);
  socket.on("receive-room", (message : any) => {
    setListOfPrivateMessages([...listOfPrivateMessages, message])
  })
  useEffect(() => {
    input.current && (input.current.scrollTop = input.current?.scrollHeight)
  }, [listOfPrivateMessages, dataListOfPrivateMessages])
  const handleClick = async () => {
    if (checkChat === true) {
      toast.warning("هذا المستحدم قام بتعطيل المحادثات")
    } else {
      onOpen()
    const response = await axios.post("chats/addchat", {
      user1: user._id,
      user2: toUserId
    })
    const chat_id = response.data._id;
    setChatId(chat_id)
    socket.emit('join-room', chat_id);
    await axios.put(`users/updateprivate/${toUserId}`, { userId: user._id});
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
        <ModalContent >
          <HeaderChatModule onClose_Module={onClose} toUserId={toUserId}/>
          <div className="flex flex-col h-[300px] overflow-auto" ref={input} style={{backgroundColor: getColor("listsBackground")}}>
            {dataListOfPrivateMessages.map((message) => (
                <PrivateMessage key={message.arrivalTime} message= {message} />
            ))}
            {listOfPrivateMessages.map((message) => (
                <PrivateMessage key={message.arrivalTime} message= {message} />
            ))}
          </div>
          <SendPrivateMessage chatId={chatId} listOfPrivateMessages= {listOfPrivateMessages} setListOfPrivateMessages = {setListOfPrivateMessages}/>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrivateChatModule;
