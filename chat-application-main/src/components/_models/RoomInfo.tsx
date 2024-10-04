import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { User } from "lucide-react";
import { Ref, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import UserOnlineModule from "../UserOnlineModule";
import { useOptionContext } from "../../context/OptionContextProvider";
import { getColor } from "../../lib/getColor";

export default function RoomInfo({controlBarRef,roomInfoIsOpen , setRoomInfoIsOpen, resetLists}: {controlBarRef: RefObject<HTMLDivElement | null>, roomInfoIsOpen: boolean, setRoomInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>, resetLists: () => void}) {
  const { option } = useOptionContext();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [onlineList, setOnlineList] = useState<string[]>([]);
  const [inRoomUsers, setInRoomUsers] = useState<[]>([]);
  const [text, setText] = useState("");

  // socket.on("online", (list : any[]) => {
  //   setOnlineList(list)
  // })
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("users/findall");
      const inusers = (await axios.get("users/findall?room=" + option.room._id))
        .data;
      const listOfOnline = response.data;
      // .filter((item : any) => {
      //   return item.status === "connect"
      // })
      setOnlineList(listOfOnline);
      setInRoomUsers(inusers);
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, [option.room]);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if ((listRef.current && controlBarRef.current) && !listRef.current.contains(event.target) && !controlBarRef.current.contains(event.target)) {
      setRoomInfoIsOpen(false);
    }
  };
  const handleChange = async (event: any) => {
    setText(event.target.value);
  };

  return (
    <>
      <style>
        {`
            .custom-placeholder::placeholder {
              color: ${getColor("textOfMainColor")};
            }
          `}
      </style>
      <div
       onClick={() => {
        resetLists();
        setRoomInfoIsOpen(true)}}
        className="flex justify-center items-center border border-black text-sm md:text-md text-white w-[100px] py-1 cursor-pointer "
        style={{ backgroundColor: getColor("mainButton") }}
      >
        <User className=" size-4 md:size-5" /> {onlineList.length}
      </div>

      <div ref={listRef} className={`flex flex-col w-[340px] absolute right-0 top-0 bottom-[31px] overflow-auto border border-black ${!roomInfoIsOpen ? "hidden" : ""}`} style={{backgroundColor: getColor("listsBackground")}}>
        <div
          className="flex items-center justify-between px-2 text-white h-[40px] fixed left-[calc(100vw-340px)] right-0 top-0 z-10"
          style={{ backgroundColor: getColor("mainColor") }}
        >
          <p className="font-bold">المتواجدين</p>
          <button
            onClick={() => setRoomInfoIsOpen(false)}
            className="p-2 border border-black rounded-lg"
            style={{
              backgroundColor: getColor("closeButton"),
              color: getColor("textOfCloseButton"),
            }}
          >
            <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
          </button>
        </div>
        <div className="mt-[40px]">
          <Input 
            placeholder="البحث..."
            width={"100%"}
            size={"sm"}
            borderRadius={"5px"}
            onChange={handleChange}
            className="!border !border-black custom-placeholder"
            style={{
              backgroundColor: getColor("mainColor"),
              color: getColor("textOfMainColor"),
            }}
          />
          {!text && (
            <div className="flex flex-col w-full">
              {inRoomUsers?.map((item: any, index: any) => {
                return <UserOnlineModule key={item._id} user_Data={item} />;
              })}
            </div>
          )}
          {!text && (
            <div
              className="w-full text-center py-1 "
              style={{
                backgroundColor: getColor("mainColor"),
                color: getColor("textOfMainColor"),
              }}
            >
              المتواجدين في الدردشه
            </div>
          )}

          <div className="flex flex-col w-full ">
            {onlineList
              .filter((item: any) => item.name.includes(text))
              .map((item: any, index: any) => {
                return <UserOnlineModule key={item._id} user_Data={item} />;
              })}
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
      </Drawer> */}
    </>
  );
}
