import { useEffect, useState } from "react";
import Buttons from "./_elements/Buttons";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";

function Post({item} : {item :any}) {
  const [userData, setUserData] = useState<Record<string, any>>({})
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${item.userId}`);
      setUserData(response.data)
    }
    fetchData()
  }, [])
  return (
    <div className="flex  gap-x-2 border px-1 py-1 h-[150px] ">
      <img src={userData.img} className="w-10 h-10 border border-gray-800" />
      <div className="flex flex-col w-full">
        <div className="flex px-2 items-center justify-between font-bold">
          <p>{userData.name}</p>
          <p>{Math.floor((Date.now() - item.arrivalTime) / (1 * 60 * 1000))}د</p>
        </div>
        <div className="flex items-center justify-between px-2  ">
          {item.type === "image/png" ? 
          <img src={item.url} className="w-[150px] h-[100px]" /> :
          ( item.type === "video/mp4" ? 
            <video width="170" height="200" preload="none" controls>
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video> :
          <AudioPlayer src={item.url}/>
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
