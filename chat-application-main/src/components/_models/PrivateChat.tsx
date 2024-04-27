import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import UserModule from "../UserModule";
import axios from "axios";

export default function PrivateChat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [listOfPrivate, setListOfPrivate] = useState([]);
  const { user } = useUserContext()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/getprivate/${user._id}`);
      setListOfPrivate(response.data.private)
    }
    const interval = setInterval(() => {
      fetchData()
    }, 1000)
    return () =>  clearInterval(interval)
  }, [])
  return (
    <>
      <div
        ref={btnRef}
        className="flex justify-center bg-blue-950 items-center border text-sm md:text-md text-white w-[100px] py-1 rounded-md cursor-pointer "
        onClick={onOpen}
      >
        <MessageCircle className=" size-4 md:size-5" /> {"الخاص"}
      </div>
      <Drawer
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
      </Drawer>
    </>
  );
}
