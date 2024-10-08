import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";

import { RefObject, useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import UserModule from "../UserModule";
import axios from "axios";
import { getColor } from "../../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";

export default function PrivateChat({controlBarRef,privateChatIsOpen , setPrivateChatIsOpen, resetLists}: {controlBarRef: RefObject<HTMLDivElement | null>, privateChatIsOpen: boolean, setPrivateChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>, resetLists: () => void}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listOfPrivate, setListOfPrivate] = useState([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUserContext()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/getprivate/${user._id}`);
      setListOfPrivate(response.data.private)
    }
    const interval = setInterval(() => {
      fetchData()
    }, 1000)
    return () =>  clearInterval(interval)
  }, [])
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if ((listRef.current && controlBarRef.current) && !listRef.current.contains(event.target) && !controlBarRef.current.contains(event.target)) {
      setPrivateChatIsOpen(false);
    }
  };
  return (
    <>
      <div
        className="flex justify-center items-center border border-black text-sm md:text-md text-white w-[100px] py-1 cursor-pointer "
        style={{backgroundColor: getColor("mainButton")}}
        onClick={() => {
          resetLists();
          setPrivateChatIsOpen(true)}}
      >
        <MessageCircle className=" size-4 md:size-5" /> {"الخاص"}
      </div>
      <div ref={listRef} className={`flex flex-col w-[21.25rem] w-max-554:w-[70%] absolute right-0 top-0 bottom-[1.9375rem] overflow-auto border border-black ${!privateChatIsOpen ? "hidden" : ""}`} style={{backgroundColor: getColor("listsBackground")}}>
      <div className="w-full flex items-center justify-between px-2  relative h-[2.5rem]" style={{backgroundColor: getColor("mainColor"), color: getColor("textOfMainColor")}}>
            <p className="font-bold">المحادثات الخاصه</p>
            <button
            onClick={() => setPrivateChatIsOpen(false)}
            className="p-2 border border-black rounded-lg"
            style={{
              backgroundColor: getColor("closeButton"),
              color: getColor("textOfCloseButton"),
            }}
          >
            <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
          </button>
          </div>
          <div className="flex flex-col h-[550px] overflow-auto">
            {listOfPrivate.map((item) => (
              <UserModule key={item} userId={item} />
            ))}
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
          <div className="w-full flex items-center justify-between px-2 bg-blue-800 text-white relative h-[50px]">
            <p className="font-bold">المحادثات الخاصه</p>
            <DrawerCloseButton backgroundColor={"red"} color={"white"} />
          </div>
          <div className="flex flex-col h-[550px] overflow-auto">
            {listOfPrivate.map((item, index) => (
              <UserModule key={index} userId={item} />
            ))}
          </div>
        </DrawerContent>
      </Drawer> */}
    </>
  );
}
