import { 
  Modal, 
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HeaderRoomModule from "./_models/_profile/HeaderRoomModule";
import { useSocketContext } from "../context/SocketContextProvider";
import SendRoomMessage from "./SendRoomMessage";
import {  Mic, Lock } from "lucide-react";
import axios from "axios";
import { useOptionContext } from "../context/OptionContextProvider";
import PrivateMessage from "./PrivateMessage";
import { toast } from "react-toastify";

function RoomContainer({room} : {room: any}) {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [listOfPrivateMessages, setListOfPrivateMessages] = useState<any[]>([])
  const { socket } = useSocketContext()
  const [inRoom, setInRoom] = useState(99)
  const {option, setOption} = useOptionContext()
  const joinRoom = (roomId: string) => {
    if (window.stream)
    {
      window.stream.getTracks().forEach((track: any) => {
        track.stop()
      });
      setOption.setMic(false)
    }
    socket.emit("join-room", roomId)
    setOption.setRoom(roomId)
  }
  const handleOpen = (roomId: string) => {
    if (inRoom < room.mics)
    {
      if (room.password)
      {
        const password = prompt("هذه الغرفة لها كلمة مرور ارجو كتابتها")
        if (password != room.password)
        {
          toast.error("كلمة مرور خاطئه", option.toastOptions)
          return
        }
      }
      joinRoom(roomId)
      onOpen()
    } else {
      toast.error("هذه الغرفة مكتملة", option.toastOptions)
    }
  }
  const handleClose = () => {
    socket.emit("leave-room", option.room)
    setOption.setRoom("")
    setOption.setMic(false)
    setOption.setVoice(false)
    socket.off("receive-room")
    onClose()
  }
  useEffect(() => {
    const getRoomNum = async () => {
      try {
        const res = await axios.get("/socket/" + room._id)
        setInRoom(res.data)
      } catch(e) {
        console.error(e)
      }
    }
    const interval = setInterval(getRoomNum, 1000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    socket.on("receive-room", (message : any) => {
      setListOfPrivateMessages([...listOfPrivateMessages, message])
    })
  }, [listOfPrivateMessages])
  return (
    <>
      <div className="flex justify-between items-center px-1 py-2" onClick={() => handleOpen(room._id)}>
        <div className="flex items-center gap-x-1">
          <img src="/1600w-qJptouniZ0A.webp" alt="logo" className="w-10 h-10" />
          <p className="text-lg font-semibold">{room.name}</p>
        </div>
        {room.password && 
          <div className="ms-auto">
            <Lock />
          </div>
        }
        <div className="px-2 py-1 bg-red-500 text-white text-sm flex items-center justify-center">
              <Mic size={"18px"}/>
              {inRoom}/{room.mics}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent pb={"10px"}>
          <HeaderRoomModule room={room} onClose_Module={handleClose}/>
          <div className="flex flex-col h-[300px] overflow-auto">
            {listOfPrivateMessages.map((message, index) => (
              <div>
                <PrivateMessage key={index} message= {message} />
              </div>
            ))}
          </div>
          <SendRoomMessage 
            RoomId={room._id} 
            listOfPrivateMessages={listOfPrivateMessages}
            setListOfPrivateMessages={setListOfPrivateMessages}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default RoomContainer;
