import { User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserOnlineContainer from "./UserOnlineContainer";
import { getColor } from "../lib/getColor";
function OnlineSection({errorMessage}: {errorMessage: string}) {
  const [onlineList, setOnlineList] = useState<string[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const listOfOnline = (await axios.get("users/findall")).data;
    console.log("--------------------------------")
    console.log(listOfOnline);
    setOnlineList(listOfOnline)
    
  }
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  
  return () => clearInterval(interval)
}, [])
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center " style={{ backgroundColor : getColor("mainColor")}}>
        <div className=" text-center w-auto px-3 h-full " style={{backgroundColor: getColor("onlineColor"), color: getColor("textOfOnlineColor")}}>
          {
            errorMessage? <span style={{color: 'red'}}>{errorMessage}</span> : "متصل"
          }
        </div>
        <div className="flex w-[70px] justify-center items-center" style={{backgroundColor: getColor("onlineColor"), color: getColor("textOfOnlineColor")}}>
          <User />
          {onlineList.length}
        </div>
      </div>
      <div className="overflow-auto flex flex-col h-[calc(100vh-160px)]">
        {
          onlineList?.map((item :  any) => {
            return <UserOnlineContainer key={item._id} user={item}/>;
          })
        }
      </div>
    </div>
  );
}

export default OnlineSection;
