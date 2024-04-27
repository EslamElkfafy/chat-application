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

export default function CommentModule() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const input  = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    input.current?.scrollIntoView({behavior:"smooth"})
  },[])
  return (
    <>
      <div
        className=" text-white gap-x-1 text-sm p-1  bg-blue-700 cursor-pointer flex items-center"
        onClick={onOpen}
      >
        <MessageCircle className="size-4" />1
      </div>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent width={"350px"}>
            <div className="flex items-center justify-between px-2 py-3 bg-blue-950 text-white">
              <div className="flex items-center gap-x-1">
                <MessagesSquare/>
                تعليقات
              </div>
              <ModalCloseButton  bg={"red"} color={"white"}/>
            </div>
            <div className="flex flex-col h-[400px] justify-between ">
                <div className="flex flex-col h-full overflow-auto">
                {
                  [...Array(1)].map(() => <div ref={input}><CommentItem/></div>)
                }
                </div>
                <CreateComment/>
            </div>
            
        </ModalContent>
      </Modal>
    </>
  );
}
