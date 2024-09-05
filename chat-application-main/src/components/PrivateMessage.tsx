import axios from "axios"
import { useEffect, useState } from "react"
import VideoPlayer from "./VideoPlayer"
import AudioPlayer from "./AudioPlayer"
import { formatText } from "../lib/formatText"


function PrivateMessage({message} : {message: any}) {
    const [dataOfUser, setDataOfUser] = useState<Record<string, any>>({})
    const [render, setRender] = useState(false)
    const url = import.meta.env.VITE_API_BASE_URL + message.url
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`users/find/${message.userId}`);
        setDataOfUser(response.data)
      }
      fetchData()
    }, [])
    useEffect(() => {
      const formatDescription = async () => {
        console.log("Starting text formatting");
        if (message.description) {
          try {

            const formattedText = await formatText(message.description);
            console.log("ofjeowjfioejwofje")
            message.description = formattedText; // Assuming the API returns the formatted text directly
            setRender(prev => !prev); // Update the state to indicate that the text formatting is done
          } catch (error) {
            console.error("Error formatting text:", error);
          }
        }
      };
    
      formatDescription();
    }, []);
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
  