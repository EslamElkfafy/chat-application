import { User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserOnlineContainer from "./UserOnlineContainer";
function OnlineSection({errorMessage}: {errorMessage: string}) {
  const [onlineList, setOnlineList] = useState<string[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const listOfOnline = (await axios.get("users/findall")).data;
    setOnlineList(listOfOnline)
    
  }
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  
  return () => clearInterval(interval)
}, [])
  return (
    <div className="w-full flex flex-col mt-2">
      <div className="flex justify-between items-center bg-gray-600">
        <div className="bg-green-700 text-center w-auto px-3 text-white">
          {
            errorMessage? <span style={{color: 'red'}}>{errorMessage}</span> : "متصل"
          }
        </div>
        <div className="flex bg-green-700 text-white w-[70px] justify-center items-center">
          <User />
          {onlineList.length}
        </div>
      </div>
      <div className="overflow-auto flex flex-col h-[400px]">
        {
          onlineList.map((item :  any, index : any) => {
            return <UserOnlineContainer key={index} user={item}/>;
          })
        }
      </div>
    </div>
  );
}

export default OnlineSection;
