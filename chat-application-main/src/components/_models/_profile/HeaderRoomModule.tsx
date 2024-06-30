import { X } from "lucide-react";

function HeaderRoomModule({ onClose_Module, room }: { onClose_Module: () => void , room: any}) {

  return (
    <>
      <div
        className="flex items-center justify-between px-2 bg-blue-950 text-white py-1"
      >
        <div className="flex items-center gap-x-1">
          <img src="/1600w-qJptouniZ0A.webp" className="w-6 h-6" />
          {room.name}
        </div>
        <div
          className="text-white bg-red-500 p-1 rounded-sm cursor-pointer"
          onClick={onClose_Module}
        >
          <X />
        </div>
      </div>
    </>
  );
}

export default HeaderRoomModule;
