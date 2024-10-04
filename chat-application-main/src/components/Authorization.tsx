import { User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import { useOptionContext } from "../context/OptionContextProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { getDeviceInfo } from "../lib/deviceInfo";
import { getColor } from "../lib/getColor";

function Authorization({
  setErrorMessage,
}: {
  setErrorMessage: (input: string) => void;
}) {
  const [choise, setChoise] = useState("nike-name");
  const router = useNavigate();
  const [nikeInput, setNikeInput] = useState("");
  const [nameSignIn, setNameSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [visiableActive, setVisiableActive] = useState(false);
  const { setOption } = useOptionContext();
  const { setUser } = useUserContext();
  const { socket } = useSocketContext();
  const classVisibleIcon = "bg-[#5BC0DE] rounded-sm";
  const handlClickSignIn = async (userName: string, password: string) => {
    try {
      const ip = await (
        await fetch("https://db.saqrchat.com")
      ).json();
      // const ip = {
      //   ip: "0.0.0.0"
      //   country: "EG"
      // }
      let room: any = null;
      const rooms = (await axios.get("general/")).data.payload;
      for (let i = 0; i < rooms.length; i++) {
        const rm = rooms[i];
        const number = (await axios.get("socket/" + rm._id)).data;
        if (number < rm.visitors) {
          room = rm;
          break;
        }
      }
      if (!room) {
        room = (await axios.post("general")).data.payload;
      }
      const { os, browser, deviceType } = getDeviceInfo();

      const device = `${os}.${deviceType}.${browser}`;
      const user = {
        userName,
        password,
        ...ip,
        device,
      };
      const response = await axios.post("auth/signin", user);
      console.log(response.data);
      const { name, country, role } = response.data;
      setUser({ ...response.data });
      setOption.setRoom(room, response.data);

      socket.emit("user", { ...response.data });
      socket.emit("sent-welcome");
      axios.post("records/addrecord", {
        userName,
        name,
        ...ip,
        country,
        role,
        device,
      });
      router("/rommId");
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
      console.log(e.message);
    }
  };
  const handlClickSignUp = async () => {
    if (nameSignUp === "" || passwordSignUp === "") {
      setErrorMessage("ارجو ادخال بيانات صحيحة");
    } else {
      try {
        await axios.post("auth/signup", {
          userName: nameSignUp,
          password: passwordSignUp,
          name: nameSignUp,
        });
        handlClickSignIn(nameSignUp, passwordSignUp);
      } catch (e: any) {
        setErrorMessage(e.response.data.message || "خطأ في الخادم");
      }
    }
  };

  const handleClickNikeName = async () => {
    if (!nikeInput) {
      setErrorMessage("ارجو ادخال بيانات صحيحة");
      console.log("i am here");
    } else {
      try {
        await axios.post("auth/guest", {
          userName: nikeInput,
          name: nikeInput,
        });
        handlClickSignIn(nikeInput, "123");
      } catch (e: any) {
        setErrorMessage(e.response.data.message || "خطأ في الخادم");
      }
    }
  };
  return (
    <div
      className="flex flex-col justify-between bg-gray-50"
      style={{ backgroundColor: getColor("backgroundItems") }}
    >
      <div className="flex flex-col">
        <div className="flex items-center bg-white text-xs lg:text-md">
          <div
            className="flex items-center cursor-pointer px-2 py-2"
            style={{
              color:
                choise == "nike-name"
                  ? getColor("authorizationActive")
                  : getColor("authorizationUnactive"),
            }}
            onClick={() => setChoise("nike-name")}
          >
            <p className="mx-3">دخول الزوار</p>
            <User size={16} />
          </div>
          <div
            className="flex items-center cursor-pointer px-2 py-2"
            style={{
              color:
                choise == "sign-in"
                  ? getColor("authorizationActive")
                  : getColor("authorizationUnactive"),
            }}
            onClick={() => setChoise("sign-in")}
          >
            <p className="mx-3">دخول الاعضاء</p>
            <User size={16} />
          </div>
          <div
            className="flex items-center cursor-pointer px-2 py-2"
            style={{
              color:
                choise == "sign-up"
                  ? getColor("authorizationActive")
                  : getColor("authorizationUnactive"),
            }}
            onClick={() => setChoise("sign-up")}
          >
            <p className="mx-3">تسجيل عضويه</p>
            <UserPlus size={16} />
          </div>
        </div>
      </div>
      <div className="h-[74px]">
        <div className="p-[4px] border-b-2 mb-[2px] border-t-2 mt-[2px] border-[#bababa] rounded-2xl h-[69px] flex justify-center items-center flex-col">
          {choise == "nike-name" && (
            <div className="flex flex-col justify-center items-center gap-x-2 px-1 w-full gap-[2px]">
              {" "}
              <Input
                className="w-full text-center"
                size={"xs"}
                backgroundColor={"white"}
                placeholder="أكتب الاسم المستعار"
                onChange={(e) => setNikeInput(e.currentTarget.value)}
                required
              />{" "}
              <Button
                className="w-full !rounded-none"
                style={{
                  backgroundColor: getColor("mainButton"),
                  color: getColor("textOfMainButton"),
                }}
                size={"xs"}
                onClick={async (e) => {
                    e.currentTarget.disabled = true
                    await handleClickNikeName();
                    e.currentTarget.disabled = false
                }}
              >
                الدخول
              </Button>
            </div>
          )}
          {choise == "sign-in" && (
            <div className="flex  flex-col gap-x-2 px-1 gap-y-1 w-full">
              {" "}
              <div dir="rtl" className="flex w-full">
                <Input
                  size={"xs"}
                  backgroundColor={"white"}
                  placeholder="اكتب اسم العضو"
                  className="text-center"
                  required
                  type="text"
                  onChange={(e) => setNameSignIn(e.target.value)}
                />
                <Input
                  size={"xs"}
                  backgroundColor={"white"}
                  className="text-center"
                  placeholder="اكتب كلمه المرور"
                  required
                  type="password"
                  onChange={(e) => setPasswordSignIn(e.target.value)}
                />
              </div>
              <div className="flex w-full">
                <Button
                  size={"xs"}
                  onClick={async (e) => {
                    e.currentTarget.disabled = true
                    console.log("disabled >>>>>>", e.currentTarget.disabled)
                    await handlClickSignIn(nameSignIn, passwordSignIn)
                    e.currentTarget.disabled = false
                  }}
                  className="flex-grow !rounded-none"
                  style={{
                    backgroundColor: getColor("mainButton"),
                    color: getColor("textOfMainButton"),
                  }}
                >
                  الدخول
                </Button>
                <span
                  className={`mx-8 px-3 cursor-pointer ${
                    visiableActive ? classVisibleIcon : ""
                  }`}
                  onClick={() => setVisiableActive((prev) => !prev)}
                >
                  <VisibilityIcon sx={{ fontSize: 40 }} />
                </span>
              </div>
            </div>
          )}
          {choise == "sign-up" && (
            <div className="flex  flex-col gap-x-2 w-full px-1 gap-y-1">
              {/* {(messageNameSignUp && <div className="text-red-500">هذا الاسم مستخدم بالفعل</div>) || (messageFeildsSignUp && <div className="text-red-500">قم بملئ الحقول</div>)} */}

              <div dir="rtl" className="flex w-full">
               
                <Input
                  size={"xs"}
                  backgroundColor={"white"}
                  className="text-center"
                  placeholder="اكتب اسم العضو"
                  required
                  type="text"
                  onChange={(e) => setNameSignUp(e.target.value)}
                />
                 <Input
                  size={"xs"}
                  backgroundColor={"white"}
                  className="text-center"
                  placeholder="اكتب كلمه المرور"
                  required
                  type="password"
                  onChange={(e) => setPasswordSignUp(e.target.value)}
                />
              </div>
              <Button
                size={"xs"}
                onClick={async (e) => {
                  e.currentTarget.disabled = true
                  await handlClickSignUp()
                  e.currentTarget.disabled = false
                }}
                className="w-full !rounded-none"
                style={{
                  backgroundColor: getColor("mainButton"),
                  color: getColor("textOfMainButton"),
                }}
              >
                الدخول
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authorization;
