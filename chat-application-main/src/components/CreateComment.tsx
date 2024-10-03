import { Input } from '@chakra-ui/react'
import { Send } from 'lucide-react'
import { useState } from 'react'
import EmojiModule from './EmojiModule';
import axios from 'axios';
import { useUserContext } from "../context/UserContextProvider";
import { getColor } from '../lib/getColor';

function CreateComment({postId} : {postId: any}) {
  const [ comment , setComment ] = useState('');
  const { user } = useUserContext()
  const handleClick = async () => {
    setComment("");
    await axios.put(`posts/addcomment/${postId}`, {userId: user._id, description: comment, arrivalTime: Date.now()});
  }
  return (
    <div className="flex items-center gap-x-1 px-1 py-1" style={{backgroundColor: getColor("backgroundItems")}}>
      <EmojiModule text={comment} setText={setComment}/>
      <Input height={"28px"} value={comment} onChange={e => setComment(e.currentTarget.value)} placeholder='اكتب رسالتك ...' bg={"white"}/>
      <div className="p-1 flex text-xs items-center rounded" onClick={handleClick} style={{backgroundColor: getColor("mainButton"), color: getColor("textOfMainButton")}}>
        <Send size={"18px"} className="cursor-pointer"/>
        إرسال
      </div>
    </div>
  )
}

export default CreateComment
