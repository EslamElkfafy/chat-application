import { useEffect, useState } from "react";
import Buttons from "./_elements/Buttons";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";

function Post({item} : {item :any}) {
  const [userData, setUserData] = useState<Record<string, any>>({})
  const [url, _] = useState(import.meta.env.VITE_API_BASE_URL + item.url)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${item.userId}`);
      setUserData(response.data)
    }
    fetchData()
  }, [])
  return (
    <div className="flex  gap-x-2 border px-1 py-1 h-[150px] ">
      <img src={import.meta.env.VITE_API_BASE_URL + userData.img} className="w-10 h-10 border border-gray-800" />
      <div className="flex flex-col w-full">
        <div className="flex px-2 items-center justify-between font-bold">
          <p>{userData.name}</p>
          <p>{Math.floor((Date.now() - item.arrivalTime) / (1 * 60 * 1000))}د</p>
        </div>
          {item.text && <p>{item.text}</p>}
        <div className="flex items-center justify-between px-2  ">
          {item.type.startsWith("image") ? 
          <img src={url} className="w-[150px] h-[100px]" /> :
          ( item.type.startsWith("video") ? 
            <VideoPlayer src={url} type={item.type}/> :
            item.type.startsWith("audio") && <AudioPlayer src={url}/>
          )
        }
          <div className="flex items-end justify-end h-full">
            <Buttons item= {item}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
