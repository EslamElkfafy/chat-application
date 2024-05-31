import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { Profile_Items } from "../../../lib/utils";
import { Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { useSocketContext } from "../../../context/SocketContextProvider";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContextProvider";
import axios from "axios";

function ReportModule({toUserId} : {toUserId: any}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("")
  const report = Profile_Items[1];
  const { socket } = useSocketContext()
  const { user } = useUserContext()
  const [ checkInfo, setCheckInfo ] = useState(false)
  const handleClick = () => {
    socket.emit("info", text, toUserId, user._id)
    setText("")
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13)
    {
      handleClick()
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${toUserId}`)
      setCheckInfo(response.data.infoBlock)
    }
    fetchData()
  }, [])
  return (
    <>
      <div
        className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center"
        onClick={() => {
          if (checkInfo === true) {
            toast.warning("هذا المستخدم قام بتعطيل التنبيهات")
          } else {
             onOpen()
          }
        }}
      >
        <report.icon className="size-5" />
        {report.text}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex py-1 px-2 items-center justify-between bg-blue-950 text-white ">
            <div className="flex   cursor-pointer  text-sm items-center justify-center">
              <report.icon className="size-5" />
              {report.text}
            </div>
            <div
              className="text-white bg-red-500 p-1 rounded-sm cursor-pointer"
              onClick={onClose}
            >
              <X />
            </div>
          </div>
          <div className="flex flex-col  py-2 px-2 gap-y-1  bg-gray-200">
            <Input bg={"white"} border={"1px solid gray"} borderRadius={"0px"} placeholder="أكتب رسالتك هنا ..." value={text} onChange={(e) => setText(e.currentTarget.value)} onKeyDown={handleKeyDown}/>
            <div className="w-full flex justify-end">
              <div className="p-1 bg-blue-950  text-white flex text-xs items-center " onClick={handleClick}>
                <Send size={"25px"} className="cursor-pointer" />
                إرسال
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReportModule;
