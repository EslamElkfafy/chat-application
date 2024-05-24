import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import {  Video, Mic, MicOff, VolumeX, Volume2 } from "lucide-react";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContextProvider";
import { useRef, useState, useEffect } from "react";
import RoomContainer from "../RoomContainer";
import CreateRoomModule from "./CreateRoomModule";
import { useOptionContext } from "../../context/OptionContextProvider";

export default function Rooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ builded, setBuilded ] = useState(false);
  const [ rooms, setRooms ]: [ rooms: any, setRooms: any] = useState([])
  const btnRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketContext()
  const {option, setOption} = useOptionContext()
  const joinRoom = (room: string) => {
    if (window.stream)
    {
      window.stream.getTracks().forEach((track: any) => {
        track.stop()
      });
      setOption.setMic(false)
    }
    socket.emit("leave-room", option.room)
    socket.emit("join-room", room)
    console.log(room)
    setOption.setRoom(room)
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get("/rooms")
        setRooms(response.data.payload)
      } catch(e) {
        console.log(e)
      }
    }
    fetchData()
  }, [rooms])
  return (
    <>
      <div
        ref={onOpen}
        className="flex justify-center bg-blue-950 items-center border text-white w-[100px] text-sm md:text-md py-1 rounded-md cursor-pointer  "
        onClick={onOpen}
      >
        <Video  className=" size-4 md:size-5" /> {"الغرف"}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-between px-2  bg-blue-800 text-white relative h-[50px]">
              <p className="font-bold">غرف الدردشه: {rooms.length}</p>
              <DrawerCloseButton backgroundColor={"red"} color={"white"} />
            </div>
            <div className="w-full bg-blue-950 py-1 px-2">
              <CreateRoomModule key={2}/>
              <span className="ms-20">

                <IconButton
                  className="me-2"
                  colorScheme={option.mic? "green": "gray"}
                  size='sm'
                  aria-label="mic"
                  icon={option.mic? <Mic size={20}/> : <MicOff size={20} color="#dd1313" />}
                  onClick={() => setOption.setMic(!option.mic)}
                />
                <IconButton
                  size='sm'
                  colorScheme={option.voice? "green": "gray"}
                  aria-label="voice"
                  icon={option.voice? <Volume2 size={20}/> : <VolumeX size={20} color="#dd1313" />}
                  onClick={() => setOption.setVoice(!option.voice)}
                />
              </span>
            </div>
            <div className="flex flex-col overflow-auto h-[550px]">
              {
                rooms.map((room: any)=>(
                  <span key={room._id} onClick={() => joinRoom(room._id)} className="btn">
                    <RoomContainer room={room}/>
                    <hr/>
                  </span>
                ))
              }
            </div>
          </div>

        </DrawerContent>
      </Drawer>
    </>
  );
}
