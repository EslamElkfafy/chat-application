import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { EMOJIS } from "../lib/utils";
import { Smile } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

type TProps = {
  setText: (text: string) => void;
  text: string;
};

function EmojiModule({ setText, text }: TProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emojis, setEmojis] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("readjsonfile/emojis");
      setEmojis(Object.entries(response.data));
    })();
  }, []);
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
          <div className="w-full h-[300px] flex flex-wrap gap-x-1 p-2 content-start overflow-auto">
            {emojis.map(([abbreviation, urlEmoji]) => (
              <div
                className="cursor-pointer"
                key={abbreviation}
                onClick={() => {
                  setText(text + " " + abbreviation + " ");
                  onClose();
                }}
              >
                <img
                  src={import.meta.env.VITE_API_BASE_URL + urlEmoji}
                  alt=""
                  className="h-5 inline-block"
                />
              </div>
            ))}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EmojiModule;
