import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import {
  Ref,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import UserOnlineModule from "../UserOnlineModule";
import { useOptionContext } from "../../context/OptionContextProvider";
import { getColor } from "../../lib/getColor";

export default function RoomInfo({
  controlBarRef,
  setRoomInfoIsOpen,
}: {
  controlBarRef: RefObject<HTMLDivElement | null>;
  setRoomInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { option } = useOptionContext();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [onlineList, setCustomOnlineList] = useState<string[]>((localStorage.getItem("online-users") && JSON.parse(localStorage.getItem("online-users"))) || []);
  const [inRoomUsers, setCustomInRoomUsers] = useState<[]>((localStorage.getItem("inroom-users") && JSON.parse(localStorage.getItem("inroom-users"))) || []);
  const [text, setText] = useState("");
  const setOnlineList = (users: string[]) => {
    localStorage.setItem("online-users", JSON.stringify(users))
    setCustomOnlineList(users)
  }
  const setInRoomUsers = (users: []) => {
    localStorage.setItem("inroom-users", JSON.stringify(users))
    setCustomInRoomUsers(users)
  }
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
      console.log("hello from users");
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
    if (
      listRef.current &&
      controlBarRef.current &&
      !listRef.current.contains(event.target) &&
      !controlBarRef.current.contains(event.target)
    ) {
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
          ref={listRef}
          className={`flex flex-col w-[21.25rem] w-max-554:w-[70%] absolute right-0 top-0 bottom-[1.9375rem] overflow-auto border border-black`}
          style={{ backgroundColor: getColor("listsBackground") }}
        >
          <div
            className="flex items-center justify-between px-2 text-white h-[2.5rem] fixed left-[calc(100vw-21.25rem)] w-max-554:left-[calc(100vw-70vw)] right-0 top-0 z-10"
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
