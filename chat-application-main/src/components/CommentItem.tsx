import axios from "axios";
import { useEffect, useState } from "react";

function CommentItem({message} : {message : any}) {
  const [userData, setUserData] = useState<Record<string, any>>({})
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${message.userId}`);
      setUserData(response.data)
    }
    fetchData()
  }, [])
  return (
    <div className="flex items-center justify-between border">
      <div className="flex items-center gap-x-1">
        <img src={userData.img} className="w-9 h-9" />
        <div className="flex flex-col justify-between">
            <p className="font-semibold">{userData.name}</p>
            <p className="font-semibold">{message.description}</p>
        </div>
      </div>
      <p className="font-semibold">{Math.floor((Date.now() - message.arrivalTime) / (1 * 60 * 1000))}د</p>
    </div>
  );
}

export default CommentItem;
