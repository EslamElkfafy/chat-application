import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import UserOnlineModule from "../UserOnlineModule";
import { useOptionContext } from "../../context/OptionContextProvider";

export default function RoomInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {option} = useOptionContext()
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [onlineList, setOnlineList] = useState<string[]>([]);
  const [inRoomUsers, setInRoomUsers] = useState<[]>([])
  const [text, setText] = useState("")

  // socket.on("online", (list : any[]) => {
  //   setOnlineList(list)
  // })
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("users/findall");
      const inusers = (await axios.get("users/findall?room=" + option.room._id)).data
      const listOfOnline = response.data
      // .filter((item : any) => {
      //   return item.status === "connect"
      // })
      setOnlineList(listOfOnline)
      setInRoomUsers(inusers)
    }
    const interval = setInterval(() => {
      fetchData()
    }, 1000)
    return () => clearInterval(interval)
  }, [option.room])
  
  const handleChange = async (event : any) => {
    setText(event.target.value);
  }
  return (
    <>
      <div
        ref={btnRef}
        className="flex justify-center bg-blue-950 items-center border text-sm md:text-md text-white w-[100px] py-1 rounded-md cursor-pointer "
        onClick={onOpen}
      >
        <User  className=" size-4 md:size-5"/> {onlineList.length}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex flex-col w-full overflow-auto">
            <div className="w-full flex items-center justify-between px-2 bg-blue-800 text-white relative h-[50px]">
              <p className="font-bold">المتواجدين</p>
              <DrawerCloseButton  backgroundColor={"red"} color={"white"}/>
            </div>
            <Input placeholder="البحث..."  width={"100%"} size={"sm"}  borderRadius={"5px"} onChange={handleChange}/>
            {
              !text && 
              <div className="flex flex-col w-full overflow-auto">
              {
              inRoomUsers?.map((item :  any, index : any) => {
                return <UserOnlineModule key={index} user_Data={item}/>;
              })}
              </div>
            }
            <div className="w-full text-center bg-green-500 text-white py-1 ">
            المتواجدين في الدردشه
            </div>
            <div className="flex flex-col w-full overflow-auto">
            {
            onlineList.filter((item) => item.name.includes(text)).map((item :  any, index : any) => {
              return <UserOnlineModule key={index} user_Data={item}/>;
            })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
