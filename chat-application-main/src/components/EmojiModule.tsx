import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { EMOJIS } from "../lib/utils";
import { ReactElement, useEffect, useRef, useState } from "react";
import axios from "axios";

type TProps = {
  setText: (text: string) => void;
  text: string;
};

function EmojiModule({ setText, text }: TProps) {
  const [emojisIsOpen, setEmojisIsOpen] = useState(false);
  const [emojis, setEmojis] = useState<any[]>([]);
  const iconEmojisRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get("readjsonfile/emojis");
      setEmojis(Object.entries(response.data));
    })();
    document.addEventListener("click",  handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    }
  }, []);
  const handleOutSideClick = (event: MouseEvent) => {
    if (iconEmojisRef.current?.contains(event.target as SVGElement)) {
      setEmojisIsOpen(true);
    } else {
      setEmojisIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <img
        ref={iconEmojisRef}
        className="text-yellow-500 cursor-pointer w-[30px]"
        src="1725456911111.gif"
      />
      <div  className={`absolute left-0 -top-[300px] border border-black z-10 w-[300px] h-[300px] flex flex-wrap gap-x-1 p-2 content-start overflow-auto bg-white ${!emojisIsOpen ? "hidden" : ""}`}>
      {emojis.map(([abbreviation, urlEmoji]) => (
              <div
                className="cursor-pointer"
                key={abbreviation}
                onClick={() => {
                  setText(text + " " + abbreviation + " ");
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
      {/* <Modal isOpen={isOpen} onClose={onClose}>
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
      </Modal> */}
    </div>
  );
}

export default EmojiModule;
