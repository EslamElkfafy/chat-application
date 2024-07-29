import { Input } from "@chakra-ui/react";
import { Send, PhoneCallIcon } from "lucide-react";
import ShareButton from "./_elements/ShareButton";
import EmojiModule from "./EmojiModule";
import { useRef, useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useOptionContext } from "../context/OptionContextProvider";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";

function SendPrivateMessage({chatId, setListOfPrivateMessages, listOfPrivateMessages} : {chatId : any,  setListOfPrivateMessages : any, listOfPrivateMessages : any}) {
  const [message, setMessage] = useState("");
  const { user } = useUserContext()
  const inputRef: any = useRef(null)
  const { socket } = useSocketContext()
  const {option} = useOptionContext()
  const [file, setFile] = useState<{
    type: string,
    url: string | ArrayBuffer | null | undefined,
    file: any
  }>({
    type: "",
    url: "",
    file: null
  })
  const handleClick = async () => {
    const tempMessage : {
      description: string,
      userId: string,
      type: string,
      url: string | ArrayBuffer | null | undefined,
      arrivalTime: number,
      error: Error | null
    } = {
      description: message,
      userId: user._id,
      arrivalTime: Date.now(),
      type: '',
      url: '',
      error: null,
    }
    if (file.file)
    {
      const toastId = toast.loading("يتم رفع الملف...", option.toastOptions)
      const formData = new FormData()
      formData.append('file', file.file)
      
      try {
        const res_url = import.meta.env.VITE_API_BASE_URL + 'upload'
        const response = await fetch(res_url, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          tempMessage.type = data.type
          tempMessage.url = data.path
          toast.update(toastId, { ...option.toastOptions, render: "تم رفع الملف بنجاح", type: "success", isLoading: false });
          inputRef.value = ""
          setFile({
            type: "",
            url: "",
            file: null
          })
          setMessage("")
        } else throw new Error("Failed to upload file")
      } catch (e: any) {
        // المفروض هنا في حالة حدوث مشكلة يعمل حذف للملف لو اتبعت
        toast.update(toastId, { ...option.toastOptions, render: "لم يتم رفع الملف", type: "error", isLoading: false})
        console.error('Error:', e)
        tempMessage.error = e
      }
    }
    if (message || tempMessage.url) {
      let new_list = [...listOfPrivateMessages, tempMessage]
      socket.emit("send-private", tempMessage, chatId)
      try {
        await axios.put(`chats/messages/${chatId}`, {message: tempMessage})
        setMessage(""); 
        setListOfPrivateMessages(new_list)
      } catch(e) {
        toast.error({ ...option.toastOptions, render: "لم يتم ارسال الرسالة", type: "error", isLoading: false})
      }
    }
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13)
    {
      handleClick()
    }
  }
  const handleChange = async (event: any) => {
    const supportedFiles = ['video/mp4', 'audio/mpeg', 'image/webp', 'image/jpeg', 'image/gif', 'image/png']
    const input = event.target
    if (input.files && input.files[0])
    {
      if (!supportedFiles.includes(input.files[0].type))
      {
        toast.error('هذا الملف غير مدعوم', option.toastOptions);
        input.value = ""
        setFile({
          type: "",
          url: "",
          file: null
        })
      }
      else
      {
        let reader = new FileReader();
        reader.onload = function(e) {
          setFile({
            type: input.files[0].type.split('/')[0],
            url: e.target?.result,
            file: input.files[0]
          })
        }
        setFile({
          type: "",
          url: "",
          file: null
        })
        reader.readAsDataURL(input.files[0]);
      }
    }
}
  return (
    <>
      <div className="flex items-center gap-x-1 px-2 mt-2 ">
        <ShareButton handleChange={handleChange} reference={inputRef}/>
        <EmojiModule text={message} setText={setMessage} />
        <Input
          height={"28px"}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="cursor-pointer p-1 bg-blue-700  text-white flex text-xs items-center rounded" onClick={handleClick}>
          <Send size={"18px"} />
          إرسال
        </div>
      </div>
      <div className="ms-auto me-auto p-5 ">
        {
          file.type &&
          file.type === "image"? <img src={file.url}/>:
          file.type === "video"? <VideoPlayer src={file.url} type={file.file.type}/>:
          file.type === "audio"? <AudioPlayer src={file.url}/>:
          <p> لا توجد معاينه </p>
        }
      </div>
    </>
  );
}

export default SendPrivateMessage;
