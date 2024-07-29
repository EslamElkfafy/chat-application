import axios from "axios"
import { useEffect, useState } from "react"
import VideoPlayer from "./VideoPlayer"
import AudioPlayer from "./AudioPlayer"


function PrivateMessage({message} : {message: any}) {
    const [dataOfUser, setDataOfUser] = useState<Record<string, any>>({})
    const url = import.meta.env.VITE_API_BASE_URL + message.url
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`users/find/${message.userId}`);
        setDataOfUser(response.data)
      }
      fetchData()
    }, [])
    return (
      <>
      
      <div  className="flex justify-between items-center w-full px-1" style={{backgroundColor: dataOfUser.backgroundColor}} >
        <div className="flex items-center gap-x-2">
          <img src={import.meta.env.VITE_API_BASE_URL + dataOfUser.img} className="w-11 h-11"/>
          <div className="flex flex-col">
            <p className={"font-bold"} style={{color: dataOfUser.nameColor, backgroundColor: dataOfUser.backgroundColor}}>{dataOfUser.name}</p>


            {message.description && <p >{message.description}</p>}
            {message.type && message.type.startsWith("image") ? 
              <img src={url} className="w-[150px]" /> :
              ( message.type.startsWith("video") ? 
                <VideoPlayer src={url} type={message.type}/> :
                message.type.startsWith("audio") && <AudioPlayer src={url}/>
              )
            }
          </div>
        </div>
      </div>
    <hr className="my-2"/>
      </>
    )
  }
  
  export default PrivateMessage
  