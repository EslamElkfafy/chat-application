import { Input } from '@chakra-ui/react'
import { Send } from 'lucide-react'
import { useState } from 'react'
import EmojiModule from './EmojiModule';

function CreateComment() {
  const [ comment , setComment ] = useState('');
  return (
    <div className="flex items-center gap-x-1 px-1 py-1 bg-gray-50 ">
      <EmojiModule text={comment} setText={setComment}/>
      <Input height={"28px"} placeholder='اكتب رسالتك ...'/>
      <div className="p-1 bg-blue-700  text-white flex text-xs items-center rounded">
        <Send size={"18px"} className="cursor-pointer"/>
        إرسال
      </div>
    </div>
  )
}

export default CreateComment
