import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EMOJIS, Profile_Items } from "../lib/utils";

function GiftModule() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gift = Profile_Items[8];
  const toast = useToast();
  return (
    <>
      <div
        className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-purple-600"
        onClick={onOpen}
      >
        <gift.icon className="size-5" />
        {gift.text}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"300px"}>
          <div className="w-full h-[300px] flex flex-wrap gap-x-1 py-2  overflow-auto">
            {EMOJIS.map((ele) => (
              <div className="cursor-pointer" id={ele} onClick={()=>{
                onClose();
                toast({
                    description : "إرسال الهدية",
                    status:"success",
                    duration: 3000
                })
               }}>
                {ele}
              </div>
            ))}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GiftModule;
