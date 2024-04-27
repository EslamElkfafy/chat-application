import { useEffect, useState } from "react"
import Message from "./Message"
import { useSocketContext } from "../context/SocketContextProvider"

function MessageContainer({listOfMessage, setListOfMessage} : {listOfMessage: any, setListOfMessage: (l : any) => void}) {
  const {socket} = useSocketContext()
  const [receive, setReceive] = useState(true)
 
  
  useEffect(() => {
    const interval = setInterval(() => {
      let alist : any = listOfMessage.filter((item : any)=> {
        return ((Date.now() - item.arrivalTime) < (1 * 60 * 1000))})
      setListOfMessage(alist)
      if (receive) {
        socket.on("receive-event", (message : any) => {
          setListOfMessage((previous : any) => ([...previous, message]))
        })
      }
      
      setReceive(false)
      }, 1000)
    return () => clearInterval(interval)
  }, [listOfMessage, receive])
  return (
    <div className={`flex flex-col h-[calc(100vh-85px)] overflow-auto`}>
      {listOfMessage.map ((item :  any, index : any) => {
        return <Message key={index} item={item}/>
      })}

    </div>
  )
}

export default MessageContainer
