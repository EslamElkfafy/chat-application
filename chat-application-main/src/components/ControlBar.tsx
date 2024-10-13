
import RoomInfo from "./_models/RoomInfo";
import Rooms from "./_models/Rooms";
import Profile from "./_models/Profile";
import PrivateChat from "./_models/PrivateChat";
import Blogs from "./_models/Blogs";
import { getColor } from "../lib/getColor";
import { useRef, useState } from "react";
import { useSystemOfLists } from "../context/SystemOfLists";

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
  return (
    <div ref={controlBarRef} className="flex  items-center gap-x-1" style={{backgroundColor: getColor("mainColor")}}>
      <RoomInfo roomInfoIsOpen={roomInfoIsOpen} setRoomInfoIsOpen={setRoomInfoIsOpen} resetLists={resetLists} controlBarRef={controlBarRef}/>
      <Rooms roomsIsOpen={roomsIsOpen} setRoomsIsOpen={setRoomsIsOpen} resetLists={resetLists} controlBarRef={controlBarRef}/>
      <Profile profileIsOpen={profileIsOpen} setProfileIsOpen={setProfileIsOpen} resetLists={resetLists} controlBarRef={controlBarRef}/>
      <PrivateChat privateChatIsOpen={privateChatIsOpen} resetLists={resetLists} setPrivateChatIsOpen={setPrivateChatIsOpen} controlBarRef={controlBarRef}/>
      <Blogs blogsIsOpen={blogsIsOpen} setBlogsIsOpen= {setBlogsIsOpen} resetLists={resetLists} controlBarRef={controlBarRef}/>
    </div>
  );
}

export default ControlBar;
