import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {  Video } from "lucide-react";

import { useRef } from "react";
import RoomContainer from "../RoomContainer";
import CreateRoomModule from "./CreateRoomModule";

export default function Rooms() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);

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
              <p className="font-bold">غرف الدردشه: 9</p>
              <DrawerCloseButton backgroundColor={"red"} color={"white"} />
            </div>
            <div className="w-full bg-blue-950 py-1 px-2">
              <CreateRoomModule/>
            </div>
            <div className="flex flex-col overflow-auto h-[550px]">
              {
                [...Array(10)].map(()=>(
                  <>
                  <RoomContainer/>
                  <hr/>
                  </>
                ))
              }
            </div>
          </div>

        </DrawerContent>
      </Drawer>
    </>
  );
}
