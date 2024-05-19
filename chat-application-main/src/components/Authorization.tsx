import { User, UserPlus } from "lucide-react";
import { useState } from "react";
import cn from "classnames";
import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import axios from "axios";

function Authorization({setListOfMessage} : {setListOfMessage: any}) {
  const [choise, setChoise] = useState("nike-name");
  const router = useNavigate();
  const [nikeInput, setNikeInput] = useState("");
  const [nameSignIn, setNameSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [messageNameSignUp, setMessageNameSignUp] = useState(false);
  const [messageFeildsSignUp, setMessageFeildsSignUp] = useState(false);
  const { user, setUser } = useUserContext()
  const { socket } = useSocketContext();
  const handlClickSignUp = async () => {
    if (nameSignUp === "" || passwordSignUp === "") {
      setMessageFeildsSignUp(true)
    } else {
      try{

        await axios.post("auth/signup", {userName: nameSignUp, password: passwordSignUp, name: nameSignUp});
        const response = await axios.post("auth/signin", {userName: nameSignUp, password: passwordSignUp});
        setUser({...response.data})
        const tempUser = {...response.data}
        const tempMessage : any = {
          arrivalTime: Date.now(),
          description : `مستخدم جديد دخل الغرفه`,
          img: tempUser.img,
          name: tempUser.name,
          fontColor: tempUser.fontColor,
          nameColor: tempUser.nameColor,
          backgroundColor: tempUser.backgroundColor
        }
        setListOfMessage((previous : any) => ([...previous, tempMessage]))
        socket.emit("sent-event", tempMessage)
        socket.emit("user", {...response.data})
        router("/rommId");
      } catch (e) {
        console.log(e)
        setMessageNameSignUp(true);
      }
    }
    

  }
  const handlClickSignIn = async () => {
    const response = await axios.post("auth/signin", {userName: nameSignIn, password: passwordSignIn});
    setUser({...response.data})
    const tempUser = {...response.data}
    const tempMessage : any = {
      arrivalTime: Date.now(),
      description : `مستخدم جديد دخل الغرفه`,
      img: tempUser.img,
      name: tempUser.name,
      fontColor: tempUser.fontColor,
      nameColor: tempUser.nameColor,
      backgroundColor: tempUser.backgroundColor
    }
    setListOfMessage((previous : any) => ([...previous, tempMessage]))
    socket.emit("sent-event", tempMessage)

    socket.emit("user", {...response.data})
    router("/rommId")
  }
  const handleClickNikeName = () => {
    setUser({
      _id: -1,
      name: nikeInput,
      backgroundColor: "#dbeafe",
      fontColor: "#000000",
      nameColor: "#000000",
      img: "/avatar.jpg"
    })

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
                nikeInput == "admin-view"
                  ? router("/admin-view")
                  : router("/rommId");
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
              <Button size={"sm"} onClick={handlClickSignIn}>
                الدخول
              </Button>
            </div>
          </div>
        )}
        {choise == "sign-up" && (
          <div className="flex  flex-col gap-x-2 w-[300px] px-1 gap-y-1">
            {(messageNameSignUp && <div className="text-red-500">هذا الاسم مستخدم بالفعل</div>) || (messageFeildsSignUp && <div className="text-red-500">قم بملئ الحقول</div>)}
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
