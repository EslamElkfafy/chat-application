import { Mic } from "lucide-react";

function RoomContainer({room} : {room: any}) {
  return (
    <div className="flex justify-between items-center px-1 py-2">
      <div className="flex items-center gap-x-1">
        <img src="/1600w-qJptouniZ0A.webp" alt="logo" className="w-10 h-10" />
        <p className="text-lg font-semibold">{room.name}</p>
      </div>
      <div className="px-2 py-1 bg-red-500 text-white text-sm flex items-center justify-center">
            <Mic size={"18px"}/>
            0/{room.mics}
      </div>
    </div>
  );
}

export default RoomContainer;
