import { Input } from '@chakra-ui/react'
import { Send } from 'lucide-react'
import { useState } from 'react'
import EmojiModule from './EmojiModule';
import axios from 'axios';
import { useUserContext } from "../context/UserContextProvider";

function CreateComment({postId} : {postId: any}) {
  const [ comment , setComment ] = useState('');
  const { user } = useUserContext()
  const handleClick = async () => {
    setComment("");
    await axios.put(`http://localhost:3000/api/posts/addcomment/${postId}`, {userId: user._id, description: comment, arrivalTime: Date.now()});
  }
  return (
    <div className="flex items-center gap-x-1 px-1 py-1 bg-gray-50 ">
      <EmojiModule text={comment} setText={setComment}/>
      <Input height={"28px"} value={comment} onChange={e => setComment(e.currentTarget.value)} placeholder='اكتب رسالتك ...'/>
      <div className="p-1 bg-blue-700  text-white flex text-xs items-center rounded" onClick={handleClick}>
        <Send size={"18px"} className="cursor-pointer"/>
        إرسال
      </div>
    </div>
  )
}

export default CreateComment
