import { Button } from "@chakra-ui/react"
import { useOptionContext } from "../context/OptionContextProvider"
import UserModal from "./UserModal"
import { useDisclosure } from "@chakra-ui/react"


function SigninMessage({item} : {item: any}) {
  const {setOption} = useOptionContext()
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <div  className="flex justify-between items-center w-full px-1" style={{borderBottom: "1px solid #bbaeae", backgroundColor: "rgba(250,238,236,255)"}}>
        <div className="flex items-center gap-x-2">
          <img src={import.meta.env.VITE_API_BASE_URL + item.img} className="w-11 h-11" onClick={onOpen}/>
          <div className="flex flex-col  py-2">
            <p className={"font-bold"} style={{color: item.nameColor, backgroundColor: item.backgroundColor, textAlign:"center", width: "fit-content", padding: "0px 10px"}}>{item.name}</p>
            <p>
              <Button color="blue" size='sm' onClick={() => setOption.setRoom(item.room._id)}>{item.room.name}</Button>
              <span>هذا المستخدم دخل الى </span>
            </p>
          </div>
        </div>
      </div>
      <UserModal isOpen={isOpen} onClose={onClose} userId={item.userId}/>
    </>
  )
}

function SignoutMessage({item}: {item: any})
{
  return (
    <div  className="flex justify-between items-center w-full px-1" style={{borderBottom: "1px solid #bbaeae", backgroundColor: "rgba(250,238,236,255)"}}>
      <div className="flex items-center gap-x-2">
        <img src={import.meta.env.VITE_API_BASE_URL + item.img} className="w-11 h-11"/>
        <div className="flex flex-col  py-2">
          <p className={"font-bold"} style={{color: item.nameColor, backgroundColor: item.backgroundColor, textAlign:"center", width: "fit-content", padding: "0px 10px"}}>{item.name}</p>
          <p>
            <span>{"{هذا المستخدم سجل خروجه}"} </span>
          </p>
        </div>
      </div>
    </div>
  )
}

function AdMessage({item}: {item: any}) {
  return (
    <div  className="flex justify-between items-center w-full px-1" style={{borderBottom: "1px solid #bbaeae", backgroundColor: "rgba(250,238,236,255)"}}>
      <div className="flex items-center gap-x-2">
        <img src={import.meta.env.VITE_API_BASE_URL + item.img} className="w-11 h-11"/>
        <div className="flex flex-col  py-2">
          <p className={"font-bold"} style={{color: item.nameColor, backgroundColor: item.backgroundColor, textAlign:"center", width: "fit-content", padding: "0px 10px"}}>{item.name}</p>
          <p>
            <span>{"{هذا المستخدم سجل خروجه}"} </span>
          </p>
        </div>
      </div>
    </div>
  )
}
function Default({item}: {item: any}) {
  return (
    <div  className="flex justify-between items-center w-full px-1" style={{borderBottom: "1px solid #bbaeae"}}>
    <div className="flex items-center gap-x-2">
      <img src={import.meta.env.VITE_API_BASE_URL + item.img} className="w-11 h-11"/>
        <div className="flex flex-col  py-2">
        <p className={"font-bold"} style={{color: item.nameColor, backgroundColor: item.backgroundColor, textAlign:"center", width: "fit-content", padding: "0px 10px"}}>{item.name}</p>
        <p style={{color: item.fontColor}}>{item.description}</p>
      </div>
    </div>
  </div>
   
  )
}

function Message({item} : {item : any}) {
  return (
    <>
      {item.type?
        item.type === 'signin'? <SigninMessage item={item}/>
        : item.type === 'signout'&& <SignoutMessage item={item}/>
        : <Default item={item}/>}
    </>
    
  )
}

export default Message
