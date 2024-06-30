import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import { useSocketContext } from "../context/SocketContextProvider"
import parse from "html-react-parser"
import { useUserContext } from "../context/UserContextProvider"

function MessageContainer({listOfMessage, setListOfMessage} : {listOfMessage: any, setListOfMessage: (l : any) => void}) {
  const {socket} = useSocketContext()
  const {user} = useUserContext()
  const [receive, setReceive] = useState(true)
  const messageRef : any = useRef(null)
 
  useEffect(() => {
    if (messageRef.current.scrollTop + 30 >= messageRef.current.scrollHeight - messageRef.current.clientHeight)
      messageRef.current.scrollTop = messageRef.current.scrollHeight
  }, [listOfMessage])
  useEffect(() => {
    if (receive) {
      socket.on("receive-event", (message : any) => {
        message.description = parse(message.description)
        setListOfMessage((previous : any) => ([...(previous.length === 21? previous.slice(1) : previous), message]))
      })
      setReceive(false)
    }
  }, [])
  return (
    <div className={`flex flex-col ${user._id == -1?'h-[calc(100vh-40px)]': 'h-[calc(100vh-85px)]'} overflow-auto`} ref={messageRef}>
      {listOfMessage.map ((item :  any, index : any) => {
        return <Message key={index} item={item}/>
      })}

    </div>
  )
}

export default MessageContainer
