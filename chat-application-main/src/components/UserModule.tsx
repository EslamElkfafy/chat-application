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
import { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContextProvider";
import GiftModule from "./GiftModule";
import axios from "axios";
import { useUserContext } from "../context/UserContextProvider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';

function UserModule({userId} : {userId: any}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { admin } = useAdminContext();
  const like = Profile_Items[2];
  const exit_ignore = "إلغاء تجاهل";
  const igonre = Profile_Items[3];
  const block = Profile_Items[4];
  const kick = Profile_Items[5];
  const delete_image = Profile_Items[6];
  const upgrade = Profile_Items[7];
  const { user } = useUserContext()
  const [ listOfLikes, setListOfLikes ] = useState([])
  const [ resultLike, setResultLike ] = useState(false)
  const [ resultBlock, setResultBlock ] = useState(false)
  const [userData, setUserData] = useState<Record<string, any>>({})

  useEffect(() => {
      const fetchData = async () => {
        const response1 = await axios.get(`users/like/${userId}`)
        const listLike = response1.data.listLike;
        setListOfLikes(listLike)
        if (listLike.includes(user._id)) {
          setResultLike(true)
        } else {
          setResultLike(false)
        }
      }
        fetchData()
  },[resultLike])

  useEffect(() => {
    const fetchData = async () => {
      const response2 = await axios.get(`users/find/${userId}`);
      setUserData(response2.data)
      const response1 = await axios.get(`users/block/${user._id}`)
      const listBlock = response1.data.listBlock;
      if (listBlock.includes(userId)) {
        setResultBlock(true)
      } else {
        setResultBlock(false)
      }
    }
      fetchData()
  }, [])
  const handleClickLike = async () => {
    await axios.put(`users/updatelike/${userId}`, {checkId: user._id, check: resultLike})
    setResultLike(!resultLike)
  }
  const handleClickBlock = async () => {
    await axios.put(`users/updateblock/${user._id}`, {checkId: userId, check: resultBlock})
    setResultBlock(!resultBlock)
  }
  return (
    
    <>
      <UserContainer onClick={onOpen} userId={userId} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"350px"}>
          <div className="flex items-center justify-between px-2 py-3 bg-blue-950 text-white">
            <img src={userData.img} className="w-6 h-6" />
            <ModalCloseButton bg={"red"} color={"white"} />
          </div>
          <img src={userData.img} className="h-[200px] bg-cover" />
          <div className="flex flex-wrap  p-1 gap-1 justify-center">
            <PrivateChatModule toUserId={userId}/>
            <ReportModule toUserId= {userId}/>
            <div
              className="border p-1  flex  rounded-md cursor-pointer w-[150px] text-sm items-center justify-center text-red-700"
              onClick={handleClickLike}
            >
              {resultLike ? <FavoriteIcon /> : <like.icon className="size-5" />}
              {listOfLikes.length}
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
