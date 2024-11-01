import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { Profile_Items } from "../../../lib/utils";
import Flags from "react-country-flag";
import { useEffect, useState } from "react";
import axios from "axios";
import { getColor } from "../../../lib/getColor";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import UserModal from "../../UserModal";

const HeaderPrivateChatModal = ({
  toUserId,
  setIsOpen,
  setIsExpand,
  isExpand,
  resetStatesOfComponent
}: {
  toUserId: any;
  setIsOpen: any;
  setIsExpand: any;
  isExpand:any;
  resetStatesOfComponent: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const chat = Profile_Items[0];
  // const report = Profile_Items[1];
  // const like = Profile_Items[2];
  // const igonre = Profile_Items[3];
  const [dataUser, setDataUser] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!toUserId) return;
    const fetchData = async () => {
      const response = await axios.get(`users/find/${toUserId}`);
      setDataUser(response.data);
    };
    fetchData();
  }, [toUserId]);
  return (
    <>
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          backgroundColor: getColor("mainColor"),
          color: getColor("textOfMainColor"),
        }}
        // onClick={onOpen}
      >
        <div className="flex items-center gap-x-1 cursor-pointer" onClick={onOpen}>
          <img
            src={import.meta.env.VITE_API_BASE_URL + dataUser.img}
            className="w-6 h-6"
          />
          {dataUser.name}
        </div>
        <div className="flex gap-1">
          <div
            className=" p-1 rounded-sm cursor-pointer border border-black px-2"
            style={{
              backgroundColor: getColor("extendButton"),
              color: getColor("textOfExtendButton"),
            }}
            onClick={() => setIsExpand((prev: any) => !prev)}
          >
            {isExpand ? <CloseFullscreenIcon /> : <OpenInFullIcon sx={{fontSize: 20}} />}
          </div>
          <div
            className=" p-1 rounded-sm cursor-pointer border border-black px-2"
            style={{
              backgroundColor: getColor("closeButton"),
              color: getColor("textOfCloseButton"),
            }}
            onClick={resetStatesOfComponent}
          >
            <RemoveIcon />
          </div>
        </div>
      </div>

      <UserModal isOpen={isOpen} onClose={onClose} userId={toUserId} />
    </>
  );
};

export default HeaderPrivateChatModal;
