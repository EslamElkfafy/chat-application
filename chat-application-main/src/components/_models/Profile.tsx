import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { Settings, UserRoundX, LogOut } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import UploadButton from "../_elements/UploadButton";
import { useSizeContext } from "../../context/SizeContextProvider";
import { useAdminContext } from "../../context/AdminContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const { setSize } = useSizeContext();
  const { admin } = useAdminContext();
  const { user, setUser } = useUserContext();
  const router = useNavigate();
  const [inputs, setInputs] = useState({
    name: user.name,
    state: user.state,
    nameColor: user.nameColor,
    fontColor: user.fontColor,
    backgroundColor: user.backgroundColor,
  })
  const [chatCheck, setChatCheck] = useState(false);
  const [infoCheck, setInfoheck] = useState(false);

  const handleChange = (event : any) => {
    setInputs({...inputs, [event.target.name] : event.target.value})
  }
  const handleClick = async () => {
    const updatedData = {...user, ...inputs};

  
    if (user._id !== -1) {
      const response = await axios.put(`users/${user._id}`, updatedData)
      setUser(response.data)
    }else {
      setUser(updatedData)
    }
  }
  const handelChatBlockClick = async () => {
    await axios.put(`users/chatblock/${user._id}`, {check: chatCheck});
    setChatCheck(!chatCheck)
  }
  const handelInfoBlockClick = async () => {
    await axios.put(`users/infoblock/${user._id}`, {check: infoCheck});
    setInfoheck(!infoCheck)
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${user._id}`)
      setChatCheck(response.data.chatBlock)
      setInfoheck(response.data.infoBlock)
    }
    fetchData()
  }, [chatCheck, infoCheck])
  return (
    <>
      <div
        ref={btnRef}
        className="flex justify-center bg-blue-950 items-center border text-sm md:text-md text-white w-[100px] py-1 rounded-md cursor-pointer "
        onClick={onOpen}
      >
        <Settings className=" size-4 md:size-5" /> {"الضبط"}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-between px-2 bg-blue-800 text-white relative h-[50px]">
              <p className="font-bold">الإعدادات</p>
              <DrawerCloseButton backgroundColor={"red"} color={"white"} />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-center w-[100px]  bg-blue-700 text-white  ">
                الزخرفه
              </label>
              <Input size={"sm"} name="name" width={"100%"} value={inputs.name} onChange={(e) =>  handleChange(e)}/>
            </div>
            <div className="flex flex-col w-full mt-1">
              <label className="text-center w-[100px]  bg-blue-700 text-white   ">
                الحاله
              </label>
              <Input size={"sm"} name="state" width={"100%"} value={inputs.state}onChange={(e) =>  handleChange(e)} readOnly  />
            </div>
            <div className="flex flex-col gap-y-1 mt-2">
              <div className="flex gap-x-1 items-center">
                <label className="text-center w-[100px]  bg-blue-700 text-white   ">
                  لون الإسم
                </label>
                <Input type="color" width={"100px"} size={"sm"} name="nameColor" value={inputs.nameColor} onChange={(e) =>  handleChange(e)}/>
              </div>
              <div className="flex gap-x-1 items-center">
                <label className="text-center w-[100px]  bg-blue-700 text-white   ">
                  لون الخط
                </label>
                <Input type="color" width={"100px"} size={"sm"} name="fontColor" value={inputs.fontColor} onChange={(e) =>  handleChange(e)} />
              </div>
              <div className="flex gap-x-1 items-center">
                <label className="text-center w-[100px]  bg-blue-700 text-white    ">
                  لون الخلفيه
                </label>
                {
                  inputs.backgroundColor ? <Input
                  type="color"
                  width={"100px"}
                  size={"sm"}
                  value={inputs.backgroundColor}
                  name="backgroundColor"
                  onChange={(e) =>  handleChange(e)}
                />:
                <Input
                  type="color"
                  width={"100px"}
                  size={"sm"}
                  name="backgroundColor"
                  onChange={(e) =>  handleChange(e)}
                />
                }
                
              </div>
            </div>
            <Button
              marginTop={"5px"}
              color={"white"}
              borderRadius={"0px"}
              _hover={{ backgroundColor: "rgb(74 222 128 )" }}
              backgroundColor={"rgb(34 197 94  )"}
              size={"sm"}
              onClick={handleClick}
            >
              حفظ
            </Button>

            <div className="flex flex-col gap-y-2 mt-2">
              <Select
                borderRadius={"0px"}
                bg={"blue"}
                textColor={"white"}
                size={"sm"}
                iconColor="white"
                onChange={(e) => setSize(parseFloat(e.currentTarget.value))}
              >
                <option className="text-black" value="1">
                  %100 - حجم الخطوط
                </option>
                <option className="text-black" value="1.2">
                  %120 - حجم الخطوط
                </option>
                <option className="text-black" value="1.1">
                  %110 - حجم الخطوط
                </option>
                <option className="text-black" value="1.05">
                  %105 - حجم الخطوط
                </option>
                <option className="text-black" value="0.95">
                  %95 - حجم الخطوط
                </option>
                <option className="text-black" value="0.90">
                  %90 - حجم الخطوط
                </option>
              </Select>
              <Select
                size={"sm"}
                borderRadius={"0px"}
                bg={"blue"}
                textColor={"white"}
                iconColor="white"
              >
                <option className="text-black">السيرفر الصوتي: الاساسي</option>
                <option className="text-black">السيرفر الصوتي: TCP</option>
                <option className="text-black">السيرفر الصوتي: UDP</option>
                <option className="text-black">
                  السيرفر الصوتي: TCP+Relay
                </option>
                <option className="text-black">
                  السيرفر الصوتي: UDP+Relay
                </option>
                <option className="text-black">
                  السيرفر الصوتي: UDP+Relay
                </option>
              </Select>
              <Select
                size={"sm"}
                borderRadius={"0px"}
                bg={"blue"}
                textColor={"white"}
                iconColor="white"
              >
                <option className="text-black">جودة المايك: الاساسيه</option>
                <option className="text-black">جودة المايك: ضعيفه</option>
                <option className="text-black">جودة المايك: متوسطه</option>
                <option className="text-black ">جودة المايك: عاليه</option>
              </Select>

              <UploadButton />
              <label
                className="bg-gray-50  border border-gray-700 rounded-md text-sm  py-1.5 outline-none w-full   cursor-pointer mx-auto block font-[sans-serif]"
                onClick={handelChatBlockClick}
              >
                <div className="px-1 flex items-center  w-full" >
                  {chatCheck && <CheckIcon />}
                <p className="text-center w-full font-bold text-gray-500"> تعطيل المحاثات الخاصه </p>
                </div>
              </label>
              <label
                className="bg-gray-50  border border-gray-700 rounded-md text-sm  py-1.5 outline-none w-full   cursor-pointer mx-auto block font-[sans-serif]"
                onClick={handelInfoBlockClick}
              >
                <div className="px-1 flex items-center  w-full" >
                {infoCheck && <CheckIcon />}
                <p className="text-center w-full font-bold text-gray-500">   تعطيل التنبيهات </p>
                </div>
              </label>
              <Button
                bg={"rgb(239 68 68)"}
                _hover={{ bg: "rgb(239 68 68)" }}
                size={"sm"}
                borderRadius={"0px"}
                leftIcon={<UserRoundX className="text-white" />}
                textAlign={"center"}
                border={"1px solid gray"}
                color={"white"}
              >
                حذف الصورة
              </Button>

              <Button
                bg={"rgb(239 68 68)"}
                _hover={{ bg: "rgb(239 68 68)" }}
                size={"sm"}
                borderRadius={"0px"}
                leftIcon={<LogOut className="text-white" />}
                textAlign={"center"}
                border={"1px solid gray"}
                color={"white"}
              >
                تسجيل خروج
              </Button>
              {admin && (
                <Button
                  size={"sm"}
                  borderRadius={"0px"}
                  border={"1px solid gray"}
                  onClick={() => {
                    if (!admin) return;
                    router("/admin-view/record");
                  }}
                >
                  لوحة تحكم
                </Button>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
