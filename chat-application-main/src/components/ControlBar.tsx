
import RoomInfo from "./_models/RoomInfo";
import Rooms from "./_models/Rooms";
import Profile from "./_models/Profile";
import PrivateChat from "./_models/PrivateChat";
import Blogs from "./_models/Blogs";

function ControlBar({setListOfMessage}: {setListOfMessage: (previous: any) => {}}) {
  return (
    <div className="flex bg-blue-900 px-2 py-2  items-center gap-x-2 mt-1">
      <RoomInfo />
      <Rooms />
      <Profile setListOfMessage={setListOfMessage}/>
      <PrivateChat />
      <Blogs/>
    </div>
  );
}

export default ControlBar;
