import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MessageCircle  , MessagesSquare} from "lucide-react";
import CreateComment from "./CreateComment";
import CommentItem from "./CommentItem";
import { useEffect, useRef } from "react";
import { getColor } from "../lib/getColor";

export default function CommentModule({item} : {item: any}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const input  = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    input.current?.scrollIntoView({behavior:"smooth"})
  },[])
  return (
    <>
      <div
        className="  gap-x-1 text-sm p-1  cursor-pointer flex items-center"
        style={{backgroundColor: getColor("mainButton"), color: getColor('textOfMainButton')}}
        onClick={onOpen}
      >
        <MessageCircle className="size-4" />{item.messages.length}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalContent width={"350px"}>
            <div className="flex items-center justify-between px-2 py-3" style={{backgroundColor: getColor("mainColor"), color: getColor("textOfMainColor")}}>
              <div className="flex items-center gap-x-1">
                <MessagesSquare/>
                تعليقات
              </div>
              <ModalCloseButton  bg={getColor("nigativeButtons")} color={getColor("textOfNigativeButtons")}/>
            </div>
            <div className="flex flex-col h-[400px] justify-between " style={{backgroundColor: getColor("listsBackground")}}>
                <div className="flex flex-col h-full overflow-auto">
                {
                  item.messages.map((message : any, index: number) => <div ref={input}><CommentItem key={index} message={message}/></div>)
                }
                </div>
                <CreateComment postId= {item._id}/>
            </div>
            
        </ModalContent>
      </Modal>
    </>
  );
}
