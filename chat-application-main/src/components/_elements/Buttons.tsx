import { Heart } from "lucide-react";
import CommentModule from "../CommentModule";
import { useState } from "react";

function Buttons() {
  const [ click , setClick ] = useState(false);
  return (
    <div className="flex items-center">
      <div className=" text-red-500  gap-x-1 text-sm p-1 flex items-center  bg-gray-100 cursor-pointer " onClick={()=>setClick(!click)}>
        <Heart className="size-4" />
        { click ? 1 : 0}
      </div>
      <CommentModule/>
    </div>
  );
}

export default Buttons;
