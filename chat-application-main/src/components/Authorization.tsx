import { User, UserPlus } from "lucide-react";
import { useState } from "react";
import cn from "classnames";
import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import { useOptionContext } from "../context/OptionContextProvider";
import axios from "axios";
import { getDeviceInfo } from "../lib/deviceInfo";

function Authorization({setErrorMessage} : {setErrorMessage: (input: string) => void}) {
  const [choise, setChoise] = useState("nike-name");
  const router = useNavigate();
  const [nikeInput, setNikeInput] = useState("");
  const [nameSignIn, setNameSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const { setOption} = useOptionContext()
  const { setUser } = useUserContext()
  const { socket } = useSocketContext();
  const handlClickSignIn = async (userName: string, password: string) => {
    try {
      const ip = await (await fetch("https://api.ipify.org/?format=json")).json()
      // const location = {
      //   countryCode: "EG"
      // }
      let room: any = null
      const rooms = (await axios.get("general/")).data.payload
      for (let i = 0; i < rooms.length; i++) {
        const rm = rooms[i]
        const number = (await axios.get("socket/" + rm._id)).data
        if (number < rm.visitors)
        {
          room = rm
          break
        }
      }
      if (!room)
      {
        room = (await axios.post("general")).data.payload
      }
      const response = await axios.post("auth/signin", {userName, password, ip});
      console.log(response.data);
      const {name, country, role} = response.data;
      setUser({...response.data})
      setOption.setRoom(room, response.data)
      
      socket.emit("user", {...response.data})
      const {os, browser, deviceType} = getDeviceInfo()
      axios.post("records/addrecord", {userName,name, ...ip, country, role, device: `${os}.${deviceType}.${browser}`});
      router("/rommId")
    } catch(e: any) {
      setErrorMessage(e.response.data.message)
      console.log(e.message);
    }
  }
  const handlClickSignUp = async () => {
    if (nameSignUp === "" || passwordSignUp === "") {
      setErrorMessage("ارجو ادخال بيانات صحيحة")
    } else {
      try{

        await axios.post("auth/signup", {userName: nameSignUp, password: passwordSignUp, name: nameSignUp});
        handlClickSignIn(nameSignUp, passwordSignUp)
      } catch (e: any) {
        setErrorMessage(e.response.data.message || "خطأ في الخادم")
      }
    }
    

  }
 
  const handleClickNikeName = async () => {
    if (!nikeInput) {
      setErrorMessage("ارجو ادخال بيانات صحيحة")
      console.log("i am here")
    } else {
      try {
        await axios.post('auth/guest', {userName: nikeInput, name: nikeInput})
        handlClickSignIn(nikeInput, '123')
      } catch(e: any) {
        setErrorMessage(e.response.data.message || "خطأ في الخادم")
      }
  }

  }
  return (
    <div className="flex flex-col justify-between bg-gray-50 h-[150px]">
      <div className="flex flex-col">
        <div className="flex items-center bg-white text-xs lg:text-md">
          <div
            className={cn(
              "flex items-center cursor-pointer px-2 py-2",
              choise == "nike-name"
                ? "text-blue-500 border rounded-md border-b-0"
                : ""
            )}
            onClick={() => setChoise("nike-name")}
          >
            <User className="size-5 md:size-7" />
            {"دخول الزوار"}
          </div>
          <div
            className={cn(
              "flex items-center cursor-pointer px-2 py-2",
              choise == "sign-in"
                ? "text-blue-500 border rounded-md border-b-0"
                : ""
            )}
            onClick={() => setChoise("sign-in")}
          >
            <User className="size-5 md:size-7" />
            {"دخول الاعضاء"}
          </div>
          <div
            className={cn(
              "flex items-center cursor-pointer px-2 py-2",
              choise == "sign-up"
                ? "text-blue-500 border rounded-md border-b-0"
                : ""
            )}
            onClick={() => setChoise("sign-up")}
          >
            <UserPlus className="size-5 md:size-7" />
            {"تسجيل عضويه"}
          </div>
        </div>
        <hr />
      </div>
      <div className="">
        {choise == "nike-name" && (
          <div className="flex gap-x-2 w-[300px] px-1">
            {" "}
            <Input
              size={"sm"}
              backgroundColor={"white"}
              width={"220px"}
              placeholder="أكتب الاسم المستعار"
              onChange={(e) => setNikeInput(e.currentTarget.value)}
              required
            />{" "}
            <Button
              size={"sm"}
              onClick={() => {
                handleClickNikeName()
              }}
            >
              الدخول
            </Button>
          </div>
        )}
        {choise == "sign-in" && (
          <div className="flex  flex-col gap-x-2 w-[300px] px-1 gap-y-1">
            {" "}
            <Input
              size={"sm"}
              backgroundColor={"white"}
              width={"220px"}
              placeholder="اكتب اسم العضو"
              required
              type="text"
              onChange={(e) => setNameSignIn(e.target.value) }
            />
            <div className="flex items-center gap-x-2 ">
              <Input
                size={"sm"}
                backgroundColor={"white"}
                width={"220px"}
                placeholder="اكتب كلمه المرور"
                required
                type="password"
                onChange={(e) => setPasswordSignIn(e.target.value) }
              />{" "}
              <Button size={"sm"} onClick={() => handlClickSignIn(nameSignIn, passwordSignIn)}>
                الدخول
              </Button>
            </div>
          </div>
        )}
        {choise == "sign-up" && (
          <div className="flex  flex-col gap-x-2 w-[300px] px-1 gap-y-1">
            {/* {(messageNameSignUp && <div className="text-red-500">هذا الاسم مستخدم بالفعل</div>) || (messageFeildsSignUp && <div className="text-red-500">قم بملئ الحقول</div>)} */}
            <Input
              size={"sm"}
              backgroundColor={"white"}
              width={"220px"}
              placeholder="اكتب اسم العضو"
              required
              type="text"
              onChange={(e) => setNameSignUp(e.target.value) }
            />
            <div className="flex items-center gap-x-2 ">
              <Input
                size={"sm"}
                backgroundColor={"white"}
                width={"220px"}
                placeholder="اكتب كلمه المرور"
                required
                type="password"
                onChange={(e) => setPasswordSignUp(e.target.value) }
              />{" "}
              <Button size={"sm"} onClick={handlClickSignUp}>الدخول</Button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Authorization;
