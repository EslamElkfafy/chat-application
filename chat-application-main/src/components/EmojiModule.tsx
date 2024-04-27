import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { EMOJIS} from "../lib/utils";
import { Smile } from "lucide-react";

type TProps = {
  setText: (text: string) => void;
  text: string;
};

function EmojiModule({ setText, text}: TProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Smile
        size={"30px"}
        className="text-yellow-500 cursor-pointer"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"300px"}>
          <div className="w-full h-[300px] flex flex-wrap gap-x-1 py-2  overflow-auto">
            {EMOJIS.map((ele) => (
              <div
                className="cursor-pointer"
                id={ele}
                onClick={(e) => setText(text + e.currentTarget.id)}
              >
                {ele}
              </div>
            ))}
            {EMOJIS.map((ele) => (
              <div
                className="cursor-pointer"
                id={ele}
                onClick={(e) => setText(text + e.currentTarget.id)}
              >
                {ele}
              </div>
            ))}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EmojiModule;
