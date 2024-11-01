import React, { useEffect, useRef, useState } from "react";
import { getColor } from "../../../lib/getColor";
import PrivateMessage from "../../PrivateMessage";
import SendPrivateMessage from "../../SendPrivateMessage";
import HeaderChatModule from "./HeaderChatModule";
import axios from "axios";
import { useSocketContext } from "../../../context/SocketContextProvider";
import { useUserContext } from "../../../context/UserContextProvider";
import { Profile_Items } from "../../../lib/utils";
import HeaderPrivateChatModal from "./HeaderPrivateChatModal";
import eventEmitter from "../../../lib/eventEmitter";

const PrivataChatModal = () => {
  const chat = Profile_Items[0];
  const input = useRef<HTMLInputElement>(null);
  const [listOfPrivateMessages, setListOfPrivateMessages] = useState<any[]>([]);
  const [dataListOfPrivateMessages, setDataListOfPrivateMessages] = useState<
    any[]
  >([]);
  const { socket } = useSocketContext();
  const [chatId, setChatId] = useState<any>(null);
  const [toUserId, setToUserId] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const hiddenClass = !isOpen ? 'hidden' : "";
  const expandClass = !isExpand ? 'bottom-[46%]' : 'bottom-[36%]';

  useEffect(() => {
    const handleUpdate = (data: any) => {
      setChatId(data.chatId);
      setToUserId(data.toUserId);
      setIsOpen(data.isOpen);
    };
    
    eventEmitter.on('updateData', handleUpdate);
  
    return () => {
      eventEmitter.off('updateData', handleUpdate);
    };
  }, []);
  useEffect(() => {
    input.current?.scrollIntoView({ behavior: "smooth" });
    const fetchData = async () => {
      const response = await axios.get(`chats/messages/${chatId}`);
      setDataListOfPrivateMessages(response.data.messages);
    };
    if (chatId) {
      fetchData();
    }
  }, [chatId]);
  socket.on("receive-room", (message: any) => {
    setListOfPrivateMessages([...listOfPrivateMessages, message]);
  });
  useEffect(() => {
    input.current && (input.current.scrollTop = input.current?.scrollHeight);
  }, [listOfPrivateMessages, dataListOfPrivateMessages]);
  const resetStatesOfComponent = () => {
    setChatId(null);
    setToUserId(null);
    setIsOpen(false);
    setIsExpand(false);
    setListOfPrivateMessages([]);
    setDataListOfPrivateMessages([]);
  }
  return (
    <div className={`absolute top-0 left-0 ${expandClass} ${hiddenClass} z-10 max-w-[31.25rem] min-w-[11.875rem] w-[99.8%] flex flex-col` }>
      <HeaderPrivateChatModal  toUserId={toUserId} setIsOpen={setIsOpen} setIsExpand={setIsExpand} isExpand={isExpand} resetStatesOfComponent={resetStatesOfComponent} />
      <div
        className="flex flex-col flex-grow  overflow-auto"
        ref={input}
        style={{ backgroundColor: getColor("listsBackground") }}
      >
        {dataListOfPrivateMessages.map((message) => (
          <PrivateMessage key={message.arrivalTime} message={message} />
        ))}
        {listOfPrivateMessages.map((message) => (
          <PrivateMessage key={message.arrivalTime} message={message} />
        ))}
      </div>
      <SendPrivateMessage
        chatId={chatId}
        listOfPrivateMessages={listOfPrivateMessages}
        setListOfPrivateMessages={setListOfPrivateMessages}
        toUserId={toUserId}
      />
    </div>
  );
};

export default PrivataChatModal;
