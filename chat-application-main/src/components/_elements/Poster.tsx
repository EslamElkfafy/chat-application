import { Input } from "@chakra-ui/react";
import {Send } from "lucide-react";
import ShareButton from "./ShareButton";
import EmojiModule from "../EmojiModule";
import { useState } from "react";

function Poster() {
  const [ title , setTitle ] = useState('')
  return (
    <div className="flex items-center gap-x-1 px-1 mt-2 ">
      <ShareButton/>
      <EmojiModule text={title} setText={setTitle}/>
      <Input  height={"28px"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
      <div className="p-1 bg-blue-700  text-white flex text-xs items-center rounded">
        <Send size={"18px"} className="cursor-pointer"/>
        إرسال
      </div>
    </div>
  )
}

export default Poster
