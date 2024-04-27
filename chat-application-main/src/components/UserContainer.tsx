import { useEffect, useState } from "react";
import Flags from "react-country-flag";
import axios from "axios";

function UserContainer({ onClick, userId }: { onClick?: () => void, userId: any }) {
  const [data , setData] : any = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log(userId)
      const response = await axios.get(`http://localhost:3000/api/users/find/${userId}`);
      console.log(response.data)
      setData(response.data)
    }
    fetchData()
  }, [])
  return (
    
    <div
      className="flex justify-between items-center px-2 border cursor-pointer "
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div className="flex items-center gap-x-1">
        <img src="/avatar.jpg" className="w-9 h-9" />
        <div className="flex flex-col justify-between py-2">
          <p>{data?.name}</p>
          <p>{data?.state}</p>
        </div>
      </div>
      <Flags countryCode="sa" svg />
    </div>
  );
}

export default UserContainer;
