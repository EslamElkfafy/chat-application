import {  Video } from "lucide-react";
import axios from "axios";
import { useRef, RefObject, useState, useEffect } from "react";
import RoomContainer from "../RoomContainer";
import CreateRoomModule from "./CreateRoomModule";
import { useSocketContext } from "../../context/SocketContextProvider";
import { getColor } from "../../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";


export default function Rooms({controlBarRef,roomsIsOpen , setRoomsIsOpen, resetLists}: {controlBarRef: RefObject<HTMLDivElement | null>, roomsIsOpen: boolean, setRoomsIsOpen: React.Dispatch<React.SetStateAction<boolean>>, resetLists: () => void}) {
  const [ rooms, setRooms ]: [ rooms: any, setRooms: any] = useState([])
  const [deleteChecker, setDeleteChecker] = useState<boolean>(false)
  const {socket} = useSocketContext()
  const listRef = useRef<HTMLDivElement | null>(null);

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
  }, [deleteChecker])
  useEffect(() => {
    const handleSocket = () => {
      setDeleteChecker((prev) => !prev)
    }
    socket.on("roomsDeleteChecker", handleSocket)
    return () => socket.off("roomsDeleteChecker", handleSocket)
  },[])
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if ((listRef.current && controlBarRef.current) && !listRef.current.contains(event.target) && !controlBarRef.current.contains(event.target)) {
      setRoomsIsOpen(false);
    }
  };
  return (
    <>
      <div
        // ref={onOpen}
        className="flex justify-center items-center border border-black text-white w-[100px] text-sm md:text-md py-1 cursor-pointer  "
        style={{backgroundColor: getColor("mainButton")}}
        onClick={() => {
          resetLists();
          setRoomsIsOpen(true)}}
      >
        <Video  className=" size-4 md:size-5" /> {"الغرف"}
      </div>
      <div ref={listRef} className={`flex flex-col w-[21.25rem] w-max-554:w-[70%] absolute right-0 top-0 bottom-[1.9375rem] overflow-auto border border-black ${!roomsIsOpen ? "hidden" : ""}`} style={{backgroundColor: getColor("listsBackground")}}>
      <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-between px-2 relative h-[2.5rem]" style={{backgroundColor: getColor("mainColor"), color: getColor("textOfMainColor")}}>
              <p className="font-bold">غرف الدردشه: {rooms.length}</p>
              <button
            onClick={() => setRoomsIsOpen(false)}
            className="p-2 border border-black rounded-lg"
            style={{
              backgroundColor: getColor("closeButton"),
              color: getColor("textOfCloseButton"),
            }}
          >
            <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
          </button>
            </div>
            <div className="w-full  py-1 px-2" style={{backgroundColor: getColor("mainButton")}}>
              <CreateRoomModule key={2}/>
              
            </div>
            <div className="flex flex-col overflow-auto h-[550px]">
              {
                rooms.map((room: any)=>(
                  <span key={room._id} className="btn cursor-pointer bg-[#fafafa]">
                    <RoomContainer room={room}/>
                    <hr/>
                  </span>
                ))
              }
            </div>
          </div>
      </div>
      {/* <Drawer
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
      </Drawer> */}
    </>
  );
}
