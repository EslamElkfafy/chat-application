import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContextProvider";
import axios from "axios";
import UserOnlineModule from "./UserOnlineModule";
import UserOnlineContainer from "./UserOnlineContainer";
function OnlineSection() {
  const [onlineList, setOnlineList] = useState<string[]>([]);

  // useEffect(() => {
  //   socket.on("online", (list: any) => {
  //     console.log("happened now in list should be output")
  //     setOnlineList(list)
  // })

  // }, [onlineList, socket])
  // socket.on("online", (list : any[]) => {
  //   console.log("-----helllo----")
  //   console.log(list)
  //   setOnlineList([...list])
  // })
//   useEffect(() => {
//     // Socket event listener
//     socket.on('online', (list : any ) => {
//       setOnlineList(list);
//     });

//     // Clean-up
//     return () => {
//         socket.off('data');
//     };
// }, []);
// socket.on("online", (list : any[]) => {
//   console.log(list)
//   setOnlineList(list)
// })
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/api/users/findall");
  
    const listOfOnline = response.data.filter((item : any) => {
      return (item.status === "connect" || ((Date.now() - item.deptureTime) < (1 * 60 * 1000)))
    })
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
        <div className="bg-green-700 text-center w-[100px] text-white">
          متصل
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
        })}
      </div>
    </div>
  );
}

export default OnlineSection;
