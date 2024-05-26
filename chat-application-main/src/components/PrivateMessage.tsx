import axios from "axios"
import { useEffect, useState } from "react"


function PrivateMessage({message} : {message: any}) {
    const [dataOfUser, setDataOfUser] = useState<Record<string, any>>({})
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`users/find/${message.userId}`);
        setDataOfUser(response.data)
      }
      fetchData()
    }, [])
    return (
      <div  className="flex justify-between items-center w-full px-1" style={{backgroundColor: dataOfUser.backgroundColor}} >
        <div className="flex items-center gap-x-2">
          <img src={import.meta.env.VITE_API_BASE_URL + dataOfUser.img} className="w-11 h-11"/>
          <div className="flex flex-col  py-2">
              <p className={"font-bold"} style={{color: dataOfUser.nameColor, backgroundColor: dataOfUser.backgroundColor}}>{dataOfUser.name}</p>
              <p >{message.description}</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default PrivateMessage
  