import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Input,
    Select,
    Button,
  } from "@chakra-ui/react";
  import country from "../lib/country.json"
  import { Profile_Items } from "../lib/utils";
  import Flags from "react-country-flag";
  import PrivateChatModule from "./_models/_profile/PrivateChatModule";
  import ReportModule from "./_models/_profile/ReportModule";
  import { useEffect, useState } from "react";
  import { useAdminContext } from "../context/AdminContextProvider";
  import GiftModule from "./GiftModule";
  import axios from "axios";
  import {toast} from 'react-toastify'
  import { useUserContext } from "../context/UserContextProvider";
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import BlockIcon from '@mui/icons-material/Block';
import Status from "../lib/Status";
import StatusRepository from "../repositories/statusRepository";
import { useOptionContext } from "../context/OptionContextProvider";
import { getColor } from "../lib/getColor";
export default function UserModal({isOpen, onClose, userId}: {isOpen: boolean, onClose: () => void, userId: string}) {
    const { admin } = useAdminContext();
    const exit_ignore = "إلغاء تجاهل";
    const igonre = Profile_Items[3];
    const block = Profile_Items[4];
    const kick = Profile_Items[5];
    const delete_image = Profile_Items[6];
    const upgrade = Profile_Items[7];
    const { user } = useUserContext()
    const {option} = useOptionContext()
    const [ room, setRoom ] = useState<any>(null)
    const [ resultBlock, setResultBlock ] = useState(false)
    const [likeActive, setLikeActive] = useState(false)
    const [userData, setUserData] = useState<Record<string, any>>({})

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLikeActive(false)
          const response2 = await axios.get(`users/find/${userId}`);
          setUserData(response2.data)
          const response1 = await axios.get(`users/block/${user._id}`)
          const listBlock = response1.data.listBlock;
          const room = (await axios.get('rooms/' + response2.data.room)).data.payload
          setRoom(room)
          if (listBlock.includes(userId)) {
            setResultBlock(true)
          } else {
            setResultBlock(false)
          }
        } catch(e: any) {
          console.log(e.message)
        }
      }
        fetchData()
    }, [isOpen])
    const handleClickLike = async () => {
      try {
        const response = await axios.post(`users/checklikes`, {userFrom: user._id, userTo: userId});
        if (response.data.result) {
          await axios.put(`users/updatelike/${userId}`)
          const statusRecord : Status = {
            name: "ارسال اعجاب",
            user1Id: user._id,
            user2Id: userId,
            roomId: option.room._id
          }
          await StatusRepository.add(statusRecord)
        } else {
          toast.info("يمكن ارسال اعجاب مره واحده في الدقيقه")
        }
        setLikeActive(true)
        // setResultLike(!resultLike)

      } catch(e) {
        console.error(e)
      }
    }
    const handleClickBlock = async () => {
      await axios.put(`users/updateblock/${user._id}`, {checkId: userId, check: resultBlock})
      setResultBlock(!resultBlock)
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent width={"350px"} style={{backgroundColor: getColor("backgroundItems")}}>
            <div className="flex items-center justify-between px-2 py-3" style={{backgroundColor: getColor("mainButton") ,  color: getColor("textOfMainButton")}}>
                <div className="flex">
                    <img src={import.meta.env.VITE_API_BASE_URL + userData.img} className="w-6 h-6" />
                    <p className="ps-2">
                        {userData.name}
                    </p>
                </div>
                <ModalCloseButton bg={getColor("closeButton")} color={getColor("textOfCloseButton")} />
            </div>
            <img src={import.meta.env.VITE_API_BASE_URL + userData.img} className="h-[200px] bg-cover" />
            <div className="flex flex-wrap  p-1 gap-1 justify-center">
              <PrivateChatModule toUserId={userId}/>
              <ReportModule toUserId= {userId}/>
              <div
                className={`border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700 ${likeActive && "bg-[#cd5c5c]" }`}
                onClick={handleClickLike}
              >
                <FavoriteIcon />
                {userData.like}
              </div>
              <div
                className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700"
                onClick={handleClickBlock}
              >
                {resultBlock ? <igonre.icon className="size-5" /> : <BlockIcon />}
                {resultBlock ? exit_ignore : igonre.text}
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
                <Flags countryCode={userData.country} svg />
                {userData.country && country[userData.country].arabic}
              </div>
              {
                room && 
                <div className="flex items-center gap-x-1 bg-blue-950 p-1 text-white font-normal border-[2px]">
                  <img src={import.meta.env.VITE_API_BASE_URL + room.img} className="w-7 h-7" />
                  {room.name}
                </div>

              }
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
    )
}