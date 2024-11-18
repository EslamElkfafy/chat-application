
import RoomInfo from "./_models/RoomInfo";
import Rooms from "./_models/Rooms";
import Profile from "./_models/Profile";
import PrivateChat from "./_models/PrivateChat";
import Blogs from "./_models/Blogs";
import { getColor } from "../lib/getColor";
import { useRef, useState } from "react";
import { useSystemOfLists } from "../context/SystemOfLists";
import { ListOfControlBarButtons } from "../lib/utils";
import { ControlBarButton } from "./ControlBarButton";

function ControlBar() {
  const controlBarRef = useRef<HTMLDivElement | null>(null);
  const {
    roomInfoIsOpen,
    setRoomInfoIsOpen,
    roomsIsOpen,
    setRoomsIsOpen,
    profileIsOpen,
    setProfileIsOpen,
    privateChatIsOpen,
    setPrivateChatIsOpen,
    blogsIsOpen,
    setBlogsIsOpen,
    resetLists,
  } = useSystemOfLists();

const openFunctions: {[key: string]: (item: boolean) => void} = {
    RoomInfo: setRoomInfoIsOpen,
    Rooms: setRoomsIsOpen,
    Profile: setProfileIsOpen,
    ProfileChat: setPrivateChatIsOpen,
    Blogs: setBlogsIsOpen
  }
  const handleButtonClick = (type: string) => {
    resetLists();
    console.log("dfjjejjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    openFunctions[type] && openFunctions[type](true);
  };
  return (
    <div ref={controlBarRef} className="flex  items-center gap-x-1" style={{backgroundColor: getColor("mainColor")}}>
      {
        ListOfControlBarButtons.map((button) => {
          return (
            <ControlBarButton key={button.type} Icon={button.icon} text={button.text} type={button.type} onClick={() => handleButtonClick(button.type)} />
          )
        })
      }
      {roomInfoIsOpen && <RoomInfo setRoomInfoIsOpen={setRoomInfoIsOpen} controlBarRef={controlBarRef}/>}
      {roomsIsOpen && <Rooms setRoomsIsOpen={setRoomsIsOpen} controlBarRef={controlBarRef}/>}
      {profileIsOpen && <Profile setProfileIsOpen={setProfileIsOpen} controlBarRef={controlBarRef}/>}
      {privateChatIsOpen && <PrivateChat resetLists={resetLists} setPrivateChatIsOpen={setPrivateChatIsOpen} controlBarRef={controlBarRef}/>}
      {blogsIsOpen && <Blogs setBlogsIsOpen= {setBlogsIsOpen} controlBarRef={controlBarRef}/>}
    </div>
  );
}

export default ControlBar;
