import { Input } from "@chakra-ui/react";
import {Send } from "lucide-react";
import ShareButton from "./ShareButton";
import EmojiModule from "../EmojiModule";
import { useState } from "react";
import { useOptionContext } from "../../context/OptionContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import AudioPlayer from "../AudioPlayer";
import VideoPlayer from "../VideoPlayer";

function Poster() {
  const { user } = useUserContext()
  const [ title , setTitle ] = useState('')
  const [file, setFile]: any = useState({
    type: "",
    url: "",
    file: null
  })
  const {option} = useOptionContext()
  const handleSend = async () => {
    if (file.file)
    {
      const toastId = toast.loading("يتم رفع الملف...", option.toastOptions)
      const formData = new FormData();
      formData.append('file', file.file);
      try {
        const res_url = import.meta.env.VITE_API_BASE_URL + 'upload'
        const response = await fetch(res_url, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
          console.log('File uploaded successfully');
          const data = await response.json()
    
          
          const newPost = {
            userId: user._id,
            url: `${data.path}`,
            type: data.type,
            arrivalTime: Date.now(),
            text: title
          };
          await axios.post("posts/addpost", newPost)
          toast.update(toastId, { ...option.toastOptions, render: "تم رفع الملف بنجاح", type: "success", isLoading: false });
        } else {
          toast.update(toastId, { ...option.toastOptions, render: "لم يتم رفع الملف", type: "error", isLoading: false });
          console.error('Failed to upload file');
          // Handle failure
        }
      } catch (error) {
          toast.update(toastId, { ...option.toastOptions, render: "لم يتم رفع الملف", type: "error", isLoading: false });
          console.error('Error:', error);
        // Handle error
      } 
    } else {
        try {
          if (title)
          {
            await axios.post("posts/addpost", {
              userId: user._id,
              type: "text only",
              arrivalTime: Date.now(),
              text: title
            })
          }
        } catch(e) {
          console.error(e)
        }
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
        reader.readAsDataURL(input.files[0]);
      }
    }
}
  return (
    <>
      <div className="flex items-center gap-x-1 px-1 mt-2 ">
        <ShareButton handleChange={handleChange}/>
        <EmojiModule text={title} setText={setTitle}/>
        <Input  height={"28px"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <div 
          className="cursor-pointer p-1 bg-blue-700  text-white flex text-xs items-center rounded"
          onClick={handleSend}
        >
          <Send size={"18px"}/>
          إرسال
        </div>
      </div>
      <div className="ms-auto me-auto p-5">
        {file.type &&
          file.type === "image"? <img src={file.url}/>:
          file.type === "video"? <VideoPlayer src={file.url} type={file.file.type}/>:
          file.type === "audio"? <AudioPlayer src={file.url}/>:
          <p> لا توجد معاينه </p>
        }
      </div>
    </>
  )
}

export default Poster
