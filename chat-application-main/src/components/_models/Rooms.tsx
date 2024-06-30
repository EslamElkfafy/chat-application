import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {  Video } from "lucide-react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import RoomContainer from "../RoomContainer";
import CreateRoomModule from "./CreateRoomModule";

export default function Rooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ builded, setBuilded ] = useState(false);
  const [ rooms, setRooms ]: [ rooms: any, setRooms: any] = useState([])
  const btnRef = useRef<HTMLDivElement | null>(null);

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
              
            </div>
            <div className="flex flex-col overflow-auto h-[550px]">
              {
                rooms.map((room: any)=>(
                  <span key={room._id} className="btn cursor-pointer">
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
