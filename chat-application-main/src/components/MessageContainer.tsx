import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import { useSocketContext } from "../context/SocketContextProvider"
import { useUserContext } from "../context/UserContextProvider"
import { useListOfMessageContext } from "../context/ListOfMessageContext"

function MessageContainer({voice} : {voice: Boolean}) {
  const {setListOfMessage, listOfMessage} = useListOfMessageContext()
  const {socket} = useSocketContext()
  const {user} = useUserContext()
  const [receive, setReceive] = useState(true)
  const messageRef : any = useRef(null)
 
  useEffect(() => {
      messageRef.current.scrollTop = messageRef.current.scrollHeight
  }, [listOfMessage])
  useEffect(() => {
    if (receive) {
      socket.on("receive-event", (message : any) => {
        setListOfMessage((previous : any) => ([...(previous.length === 21? previous.slice(1) : previous), message]))
      })
      setReceive(false)
    }
  }, [])
  return (
    <div className={`flex flex-col ${voice? 'h-[calc(100vh-162px)]': 'h-[calc(100vh-82px)]'} overflow-auto`} ref={messageRef}>
      {listOfMessage.map ((item :  any, index : any) => {
        return <Message key={index} item={item}/>
      })}

    </div>
  )
}

export default MessageContainer
