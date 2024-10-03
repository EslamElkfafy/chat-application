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
import { Settings, UserRoundX, LogOut, Megaphone } from "lucide-react";
import { renderToString } from "react-dom/server";
import { RefObject, useEffect, useRef, useState } from "react";
import UploadButton from "../_elements/UploadButton";
import { useSizeContext } from "../../context/SizeContextProvider";
import { useAdminContext } from "../../context/AdminContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { useSocketContext } from "../../context/SocketContextProvider";
import { useListOfMessageContext } from "../../context/ListOfMessageContext";
import { getColor } from "../../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";
import { ListOfcolorsPalette } from "../../lib/utils";
import { toast } from "react-toastify";
import { useOptionContext } from "../../context/OptionContextProvider";
import UserRepository from "../../repositories/userRepository";

export default function Profile({
  controlBarRef,
  profileIsOpen,
  setProfileIsOpen,
  resetLists,
}: {
  controlBarRef: RefObject<HTMLDivElement | null>;
  profileIsOpen: boolean;
  setProfileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetLists: () => void;
}) {
  const { setListOfMessage } = useListOfMessageContext();
  const { size, setSize } = useSizeContext();
  const { socket } = useSocketContext();
  const { user, setUser } = useUserContext();
  const {option} = useOptionContext();
  const router = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);
  const nameColorRef = useRef<HTMLDivElement | null>(null);
  const fontColorRef = useRef<HTMLDivElement | null>(null);
  const backgroundColorRef = useRef<HTMLDivElement | null>(null);
  const [paletteOfNameIsOpen, setPaletteOfNameIsOpen] =
    useState<boolean>(false);
  const [paletteOfFontIsOpen, setPaletteOfFontIsOpen] =
    useState<boolean>(false);
  const [paletteOfBackgroundColorIsOpen, setPaletteOfBackgroundColorIsOpen] =
    useState<boolean>(false);
    const paletteOptions = [
      { condition: paletteOfNameIsOpen, position: "top-[160px]", state: "nameColor" },
      { condition: paletteOfFontIsOpen, position: "top-[192px]", state: "fontColor" },
      { condition: paletteOfBackgroundColorIsOpen, position: "top-[228px]", state: "backgroundColor" },
    ];
    
    const activePalette = paletteOptions.find(option => option.condition) || { position: "", state: "" };
    
    const positionOfPaletteColor = activePalette.position;
    const hiddenOfPalette = activePalette.position ? "" : "hidden";
    const stateOfPalette = activePalette.state;
  const [inputs, setInputs] = useState({
    name: user.name,
    state: user.state,
    nameColor: user.nameColor,
    fontColor: user.fontColor,
    backgroundColor: user.backgroundColor,
  });
  const [chatCheck, setChatCheck] = useState(false);
  const [infoCheck, setInfoheck] = useState(false);
  const changeSize = (value: number) => {
    console.log(value)
    const root = document.querySelector("html");
    root!.style.fontSize = `${16 * value}px`;
    setSize(value);
  };
  const handleAdv = () => {
    const message = prompt("ادخل رسالة الاعلان");
    const tempMessage: any = {
      arrivalTime: Date.now(),
      description: message,
      img: "uploads/adv.jpg",
      name: user.name,
      type: "ad",
      fontColor: "black",
      nameColor: "black",
      backgroundColor: false,
    };
    setListOfMessage((previous: any) => [
      ...(previous.length === 21 ? previous.slice(1) : previous),
      tempMessage,
    ]);
    socket.emit("sent-event", tempMessage);
  };
  const handleChange = (key : string, value: string) => {
    setInputs({ ...inputs, [key]: value});
  };
  const handleClick = async () => {
    const newUser = { ...user, ...inputs };
    const toastId = toast.loading("يتم حفظ البيانات", option.toastOptions)
    try {
      await UserRepository.update(newUser)
      setUser(newUser);
      toast.update(toastId, {
        ...option.toastOptions,
        render: "تم حفظ البيانات",
        isLoading: false,
        type: "success"
      })
    } catch(e) {
      toast.update(toastId, {
        ...option.toastOptions,
        render: "حدث خطأ في السيرفر",
        isLoading: false,
        type: "error"
      })
    }
  };
  const handelChatBlockClick = async () => {
    await axios.put(`users/chatblock/${user._id}`, { check: !chatCheck });
    setChatCheck(prev => !prev);
  };
  const handelInfoBlockClick = async () => {
    await axios.put(`users/infoblock/${user._id}`, { check: !infoCheck });
    setInfoheck(prev => !prev);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`users/find/${user._id}`);
      setChatCheck(response.data.chatBlock);
      setInfoheck(response.data.infoBlock);
    };
    fetchData();
  }, [chatCheck, infoCheck]);

  const logout = () => {
    const tempMessage = {
      img: user.img,
      name: user.name,
      type: "logout",
    };
    socket.emit("send-room", tempMessage, user.room);
    location.reload();
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (
      listRef.current &&
      controlBarRef.current &&
      !listRef.current.contains(event.target) &&
      !controlBarRef.current.contains(event.target)
    ) {
      setProfileIsOpen(false);
    }
    setPaletteOfNameIsOpen(!!nameColorRef.current?.contains(event.target));
    setPaletteOfFontIsOpen(!!fontColorRef.current?.contains(event.target));
    setPaletteOfBackgroundColorIsOpen(
      !!backgroundColorRef.current?.contains(event.target)
    );
  };

  const deleteImgHandler = async () => {
    const toastId = toast.loading("يتم حذف الصورة الشخصية", option.toastOptions)
    try {
      const img = await UserRepository.deleteImg(user._id)
      setUser((user: any) => ({
        ...user,
        img
      }))
      toast.update(toastId, {
        ...option.toastOptions,
        render: "تم حذف الصورة الشخصية",
        isLoading: false,
        type: "success"
      })
    } catch(e) {
      toast.update(toastId, {
        ...option.toastOptions,
        render: "حدث خطأ في السيرفر",
        isLoading: false,
        type: "error"
      })
    }
  }
  return (
    <>
      <div
        className="flex justify-center  items-center border border-black text-sm md:text-md text-white w-[100px] py-1 cursor-pointer "
        style={{ backgroundColor: getColor("mainButton") }}
        onClick={() => {
          resetLists();
          setProfileIsOpen(true);
        }}
      >
        <Settings className=" size-4 md:size-5" /> {"الضبط"}
      </div>
      <div
        className={`w-[260px] h-52 fixed ${positionOfPaletteColor} right-[230px] ${hiddenOfPalette} z-30 flex flex-wrap overflow-y-auto`}
        style={{ backgroundColor: getColor("backgroundItems") }}
      >
        {ListOfcolorsPalette.map((item: string, index: number) => {
          return (
            <div
              key={item + index}
              className={`w-10 h-10`}
              style={{ backgroundColor: item }}
              onClick={() => handleChange(stateOfPalette, item)}
            ></div>
          );
        })}
      </div>
      <div
        ref={listRef}
        className={`flex flex-col w-[340px] absolute right-0 top-0 bottom-[31px] overflow-auto border border-black ${
          !profileIsOpen ? "hidden" : ""
        }`}
        style={{ backgroundColor: getColor("backgroundItems") }}
      >
        <div
          style={{
            backgroundColor: getColor("settingsBackground"),
            color: getColor("textOfSettingsBackground"),
          }}
        >
          <div
            className="w-full flex items-center justify-between px-2 relative h-[40px]"
            style={{
              backgroundColor: getColor("mainColor"),
              color: getColor("textOfMainColor"),
            }}
          >
            <p className="font-bold">الإعدادات</p>
            <button
              onClick={() => setProfileIsOpen(false)}
              className="p-2 border border-black rounded-lg"
              style={{
                backgroundColor: getColor("closeButton"),
                color: getColor("textOfCloseButton"),
              }}
            >
              <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
            </button>
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-center w-[100px]"
              style={{
                backgroundColor: getColor("mainButton"),
                color: getColor("textOfMainButton"),
              }}
            >
              الزخرفه
            </label>
            <Input
              size={"sm"}
              name="name"
              width={"100%"}
              value={inputs.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full mt-1">
            <label
              className="text-center w-[100px]"
              style={{
                backgroundColor: getColor("mainButton"),
                color: getColor("textOfMainButton"),
              }}
            >
              الحاله
            </label>
            <Input
              size={"sm"}
              name="state"
              width={"100%"}
              value={inputs.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-1 mt-2">
            <div className="flex gap-x-1 items-center">
              <label
                className="text-center w-[100px]"
                style={{
                  backgroundColor: getColor("mainButton"),
                  color: getColor("textOfMainButton"),
                }}
              >
                لون الإسم
              </label>
              <div
                className="w-16 h-6 border border-black"
                style={{ backgroundColor: inputs.nameColor }}
                ref={nameColorRef}
              ></div>
              {/* <Input
              type="color"
              width={"100px"}
              size={"sm"}
              name="nameColor"
              value={inputs.nameColor}
              onChange={(e) => handleChange(e)}
            /> */}
            </div>
            <div className="flex gap-x-1 items-center">
              <label
                className="text-center w-[100px]"
                style={{
                  backgroundColor: getColor("mainButton"),
                  color: getColor("textOfMainButton"),
                }}
              >
                لون الخط
              </label>
              <div
                className="w-16 h-6 border border-black"
                style={{ backgroundColor: inputs.fontColor }}
                ref={fontColorRef}
              ></div>
              {/* <Input
                type="color"
                width={"100px"}
                size={"sm"}
                name="fontColor"
                value={inputs.fontColor}
                onChange={(e) => handleChange(e)}
              /> */}
            </div>
            <div className="flex gap-x-1 items-center">
              <label
                className="text-center w-[100px]"
                style={{
                  backgroundColor: getColor("mainButton"),
                  color: getColor("textOfMainButton"),
                }}
              >
                لون الخلفيه
              </label>
              <div
                className="w-16 h-6 border border-black"
                style={{ backgroundColor: inputs.backgroundColor }}
                ref={backgroundColorRef}
              ></div>
              {/* {inputs.backgroundColor ? (
                <Input
                  type="color"
                  width={"100px"}
                  size={"sm"}
                  value={inputs.backgroundColor}
                  name="backgroundColor"
                  onChange={(e) => handleChange(e)}
                />
              ) : (
                <Input
                  type="color"
                  width={"100px"}
                  size={"sm"}
                  name="backgroundColor"
                  onChange={(e) => handleChange(e)}
                />
              )} */}
            </div>
          </div>
        </div>

        <Button
          marginTop={"5px"}
          color={getColor("textOfPositiveButtons")}
          borderRadius={"0px"}
          _hover={{ backgroundColor: "rgb(74 222 128 )" }}
          backgroundColor={getColor("positiveButtons")}
          size={"sm"}
          border={"1px solid black"}
          onClick={handleClick}
        >
          حفظ
        </Button>

        <div className="flex flex-col gap-y-2 mt-2">
          <Select
            borderRadius={"0px"}
            bg={getColor("mainButton")}
            textColor={getColor("textOfMainButton")}
            size={"sm"}
            iconColor="white"
            value={size}
            textAlign={"center"}
            onChange={(e) => changeSize(parseFloat(e.currentTarget.value))}
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
          <UploadButton />
          <Button
            bg={getColor("nigativeButtons")}
            _hover={{ bg: "rgb(239 68 68)" }}
            size={"sm"}
            borderRadius={"2px"}
            leftIcon={<UserRoundX style={{color: getColor('textOfNigativeButtons')}} />}
            textAlign={"center"}
            border={"1px solid black"}
            color={getColor("textOfNigativeButtons")}
            onClick={deleteImgHandler}
          >
            حذف الصورة
          </Button>
          <label
            className=" border border-black rounded-sm text-sm  py-1.5 outline-none w-full   cursor-pointer mx-auto block font-[sans-serif]"
            style={{backgroundColor: getColor("neutralButtons"), color: getColor("textOfNeutralButtons")}}
            onClick={handelChatBlockClick}
          >
            <div className="px-1 flex items-center  w-full">
              {chatCheck && <CheckIcon />}
              <p className="text-center w-full font-bold">
                {" "}
                تعطيل المحاثات الخاصه{" "}
              </p>
            </div>
          </label>
          <label
            className=" border border-black rounded-sm text-sm  py-1.5 outline-none w-full   cursor-pointer mx-auto block font-[sans-serif]"
            style={{backgroundColor: getColor("neutralButtons"), color: getColor("textOfNeutralButtons")}}
            onClick={handelInfoBlockClick}
          >
            <div className="px-1 flex items-center  w-full">
              {infoCheck && <CheckIcon />}
              <p className="text-center w-full font-bold">
                {" "}
                تعطيل التنبيهات{" "}
              </p>
            </div>
          </label>
          <Button
            bg={getColor("neutralButtons")}
            size={"sm"}
            borderRadius={"2px"}
            leftIcon={<Megaphone style={{color: getColor("textOfNeutralButtons")}} />}
            textAlign={"center"}
            border={"1px solid black"}
            color={getColor("textOfNeutralButtons")}
            onClick={handleAdv}
          >
            الإعلان للأدعية والمسابقات
          </Button>
        

          <Button
            bg={getColor("nigativeButtons")}
            _hover={{ bg: "rgb(239 68 68)" }}
            size={"sm"}
            borderRadius={"2px"}
            leftIcon={<LogOut style={{color: getColor('textOfNigativeButtons')}}/>}
            textAlign={"center"}
            border={"1px solid black"}
            color={getColor('textOfNigativeButtons')}
            onClick={logout}
          >
            تسجيل خروج
          </Button>
          {user && user.role === "admin" && (
            <Button
              size={"sm"}
              borderRadius={"0px"}
              border={"1px solid gray"}
              onClick={() => {
                router("/admin-view");
              }}
            >
              لوحة تحكم
            </Button>
          )}
        </div>
      </div>
      {/* <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerContent boxShadow="none">
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-between px-2 relative h-[50px]" style={{backgroundColor: getColor("mainColor"), color: getColor("textOfMainColor")}}>
              <p className="font-bold">الإعدادات</p>
              <DrawerCloseButton backgroundColor={getColor("closeButton")} color={getColor("textOfCloseButton")} />
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
              <Input size={"sm"} name="state" width={"100%"} value={inputs.state}onChange={(e) =>  handleChange(e)} />
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
                value={size}
                onChange={(e) => changeSize(parseFloat(e.currentTarget.value))}
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
                bg={"blue"}
                _hover={{ bg: "rgb(0, 0, 200)"}}
                size={"sm"}
                borderRadius={"0px"}
                leftIcon={<Megaphone className="text-white" />}
                textAlign={"center"}
                border={"1px solid gray"}
                color={"white"}
                onClick={handleAdv}
              >
                الإعلان للأدعية والمسابقات
              </Button>
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
                onClick={logout}
              >
                تسجيل خروج
              </Button>
              {user && user.role === 'admin' && (
                <Button
                  size={"sm"}
                  borderRadius={"0px"}
                  border={"1px solid gray"}
                  onClick={() => {
                    router("/admin-view/record");
                  }}
                >
                  لوحة تحكم
                </Button>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer> */}
    </>
  );
}
