import { useEffect, useRef, useState } from "react";
import Flags from "react-country-flag";
import axios from "axios";
import { useUserContext } from "../context/UserContextProvider";

function UserPrivateContainer({ userId }: { userId: any }) {
  const {user} = useUserContext();
  const [data , setData] : any = useState();
  const lastMassageRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${userId}`);
      // const response1 = await axios.post(`chats/lastmassage`,{
      //   user1: user._id,
      //   user2: userId,
      // })
      // lastMassageRef.current = response1.data.lastMassage;
      setData(response.data)
    }
    fetchData()
  }, [])
  return (
    <div
      className="flex justify-between items-center px-2 border cursor-pointer "
      // onClick={() => {
      //   if (onClick) onClick();
      // }}
    >
      <div className="flex items-center gap-x-1">
        <img src={import.meta.env.VITE_API_BASE_URL + data?.img} className="w-9 h-9" />
        <div className="flex flex-col justify-between py-2">
          <p style={{color: data?.nameColor, backgroundColor: data?.backgroundColor}}>{data?.name}</p>
          {/* <p style={{color: "#888888"}}>{lastMassageRef.current}</p> */}
        </div>
      </div>
      <Flags countryCode="sa" svg />
    </div>
  );
}

export default UserPrivateContainer;
