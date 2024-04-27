import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import UserContainer from "./UserContainer";
import { Profile_Items } from "../lib/utils";
import Flags from "react-country-flag";
import PrivateChatModule from "./_models/_profile/PrivateChatModule";
import ReportModule from "./_models/_profile/ReportModule";
import { useState } from "react";
import { useAdminContext } from "../context/AdminContextProvider";
import GiftModule from "./GiftModule";

function UserModule({userId} : {userId: any}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [likes, setLikes] = useState(false);
  const [ignores, setIgnores] = useState(false);
  const { admin } = useAdminContext();
  const like = Profile_Items[2];
  const exit_ignore = "إلغاء تجاهل";
  const igonre = Profile_Items[3];
  const block = Profile_Items[4];
  const kick = Profile_Items[5];
  const delete_image = Profile_Items[6];
  const upgrade = Profile_Items[7];


  return (
    <>
      <UserContainer onClick={onOpen} userId={userId} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"350px"}>
          <div className="flex items-center justify-between px-2 py-3 bg-blue-950 text-white">
            <img src="/avatar.jpg" className="w-6 h-6" />
            <ModalCloseButton bg={"red"} color={"white"} />
          </div>
          <img src="/avatar.jpg" className="h-[200px] bg-cover" />
          <div className="flex flex-wrap  p-1 gap-1 justify-center">
            <PrivateChatModule toUserId={userId}/>
            <ReportModule toUserId= {userId}/>
            <div
              className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700"
              onClick={() => setLikes(!likes)}
            >
              <like.icon className="size-5" />
              {likes ? 1 : like.text}
            </div>
            <div
              className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700"
              onClick={() => setIgnores(!ignores)}
            >
              <igonre.icon className="size-5" />
              {ignores ? exit_ignore : igonre.text}
            </div>
            {admin && (
              <>
                <div className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700">
                  <kick.icon className="size-5" />
                  {kick.text}
                </div>
                <div className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700">
                  <delete_image.icon className="size-5" />
                  {delete_image.text}
                </div>
                <div className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700">
                  <block.icon className="size-5" />
                  {block.text}
                </div>
                <GiftModule/>
                <div className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-green-700">
                  <upgrade.icon className="size-5" />
                  {upgrade.text}
                </div>
              </>
            )}
          </div>
          <p className="text-center mt-1 text-black font-semibold">عضو جديد</p>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-x-2 px-2 ">
              <Flags countryCode="sa" svg />
              مملكة السعودية
            </div>
            <div className="flex items-center gap-x-1 bg-blue-950 p-1 text-white font-normal border-[2px]">
              <img src="/1600w-qJptouniZ0A.webp" className="w-7 h-7" />
              غرفة
            </div>
          </div>
          {admin && (
            <>
              <hr />
              <div className="flex flex-col gap-y-3 w-[200px] px-2 py-2">
                <div className="flex flex-col gap-y-1">
                  <label>مجموعة</label>
                  <Select>
                    {[...Array(5)].map((_, i) => (
                      <option>مجموعة {i + 1}</option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label>عدد أيام</label>
                  <Input size={"sm"} type="number" />
                </div>
                <Button>
                  حفظ
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserModule;
