import { Button } from "@chakra-ui/react";
import { useOptionContext } from "../context/OptionContextProvider";
import UserModal from "./UserModal";
import { useDisclosure } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { Megaphone } from "lucide-react";
import { useUserContext } from "../context/UserContextProvider";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import FormatText from "../lib/formatText";

function SigninMessage({ item }: { item: any }) {
  const { setOption } = useOptionContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserContext();
  return (
    <>
      <div
        className="flex justify-between items-center w-full px-1"
        style={{
          borderBottom: "1px solid #bbaeae",
          backgroundColor: "rgba(250,238,236,255)",
        }}
      >
        <div className="flex items-center gap-x-2">
          <img
            src={import.meta.env.VITE_API_BASE_URL + item.img}
            className="w-11 h-11"
            onClick={onOpen}
          />
          <div className="flex flex-col  py-2">
            <p
              className={"font-bold"}
              style={{
                textAlign: "center",
                width: "fit-content",
                padding: "0px 10px",
              }}
            >
              {item.name}
            </p>
            <p>
              <Button
                color="blue"
                size="sm"
                onClick={() => setOption.setRoom(item.room, user)}
              >
                {item.room && item.room.name}
              </Button>
              <span>هذا المستخدم دخل الى </span>
            </p>
          </div>
        </div>
      </div>
      <UserModal isOpen={isOpen} onClose={onClose} userId={item.userId} />
    </>
  );
}
function RejoinMessage({ item }: { item: any }) {
  const { setOption } = useOptionContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserContext();
  return (
    <>
      <div
        className="flex justify-between items-center w-full px-1"
        style={{
          borderBottom: "1px solid #bbaeae",
          backgroundColor: "rgba(250,238,236,255)",
        }}
      >
        <div className="flex items-center gap-x-2">
          <img
            src={import.meta.env.VITE_API_BASE_URL + item.img}
            className="w-11 h-11"
            onClick={onOpen}
          />
          <div className="flex flex-col  py-2">
            <p
              className={"font-bold"}
              style={{
                textAlign: "center",
                width: "fit-content",
                padding: "0px 10px",
              }}
            >
              {item.name}
            </p>
            <p>
              <Button
                color="blue"
                size="sm"
                onClick={() => setOption.setRoom(item.room, user)}
              >
                {item.room && item.room.name} <LogOut />
              </Button>
              <span>هذا المستخدم انتقل الى </span>
            </p>
          </div>
        </div>
      </div>
      <UserModal isOpen={isOpen} onClose={onClose} userId={item.userId} />
    </>
  );
}

function SignoutMessage({ item }: { item: any }) {
  return (
    <div
      className="flex justify-between items-center w-full px-1"
      style={{
        borderBottom: "1px solid #bbaeae",
        backgroundColor: "rgba(250,238,236,255)",
      }}
    >
      <div className="flex items-center gap-x-2">
        <img
          src={import.meta.env.VITE_API_BASE_URL + item.img}
          className="w-11 h-11"
        />
        <div className="flex flex-col  py-2">
          <p
            className={"font-bold"}
            style={{
              textAlign: "center",
              width: "fit-content",
              padding: "0px 10px",
            }}
          >
            {item.name}
          </p>
          <p>
            <span>{"{هذا المستخدم غادر الغرفة}"} </span>
          </p>
        </div>
      </div>
    </div>
  );
}
function LogoutMessage({ item }: { item: any }) {
  return (
    <div
      className="flex justify-between items-center w-full px-1"
      style={{
        borderBottom: "1px solid #bbaeae",
        backgroundColor: "rgba(250,238,236,255)",
      }}
    >
      <div className="flex items-center gap-x-2">
        <img
          src={import.meta.env.VITE_API_BASE_URL + item.img}
          className="w-11 h-11"
        />
        <div className="flex flex-col  py-2">
          <p
            className={"font-bold"}
            style={{
              textAlign: "center",
              width: "fit-content",
              padding: "0px 10px",
            }}
          >
            {item.name}
          </p>
          <p>
            <span>{"(تسجيل خروج)"} </span>
          </p>
        </div>
      </div>
    </div>
  );
}
function HelloMessage({ item }: { item: any }) {
  if (item.description)
    return (
      <div
        className="flex justify-between items-center w-full px-1"
        style={{
          borderBottom: "1px solid #bbaeae",
          backgroundColor: "rgba(250,238,236,255)",
        }}
      >
        <div className="flex items-center gap-x-2">
          <img
            src={import.meta.env.VITE_API_BASE_URL + item.img}
            className="w-11 h-11"
          />
          <div className="flex flex-col  py-2">
            <p
              className={"font-bold"}
              style={{
                color: "red",
                textAlign: "center",
                width: "fit-content",
                padding: "0px 10px",
              }}
            >
              رسالة ترحيب
            </p>
            <p>
              <span>{item.description} </span>
            </p>
          </div>
        </div>
      </div>
    );
  return <></>;
}

function AdMessage({ item }: { item: any }) {
  return (
    <div
      className="flex justify-between items-center w-full px-1"
      style={{
        borderBottom: "1px solid #bbaeae",
        backgroundColor: "rgba(230,230,250 ,255)",
      }}
    >
      <div className="flex items-center gap-x-2">
        <img
          src={import.meta.env.VITE_API_BASE_URL + "uploads/adv.jpg"}
          className="w-11 h-11"
        />
        <div className="flex flex-col  py-2">
          <p
            className={"font-bold"}
            style={{
              color: "red",
              textAlign: "center",
              width: "fit-content",
              padding: "0px 10px",
            }}
          >
            {item.name}
          </p>
          <p>
            <span className="flex">
              <Megaphone fill="blue" color="blue" />
              <strong style={{ color: "blue" }}>إعلان</strong>
              {item.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
function Default({ item }: { item: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      className="flex justify-between items-center w-full px-1"
      style={{ borderBottom: "1px solid #bbaeae" }}
    >
      <div className="flex items-center gap-x-2">
        <img
          src={import.meta.env.VITE_API_BASE_URL + item.img}
          className="w-11 h-11"
          onClick={onOpen}
        />
        <div className="flex flex-col  py-2">
          <p
            className={"font-bold"}
            style={{
              color: item.nameColor,
              backgroundColor: item.backgroundColor,
              textAlign: "center",
              width: "fit-content",
              padding: "0px 10px",
            }}
          >
            {item.name}
          </p>
          <p style={{ color: item.fontColor }}>{item.description}</p>
        </div>
      </div>
      <UserModal isOpen={isOpen} onClose={onClose} userId={item.userId} />
    </div>
  );
}
function WelcomaDailyMessage({ item }: { item: any }) {
  return (
    <div
      className="flex justify-between items-center w-full px-1"
      style={{ borderBottom: "1px solid #bbaeae", backgroundColor: "#e6ecfa" }}
    >
      <div className="flex items-center gap-x-2">
        <img
          src={import.meta.env.VITE_API_BASE_URL + "uploads/1600w-qJptouniZ0A.webp"}
          className="w-11 h-11"
        />
        <div className="flex flex-col  py-2">
          <p
            className={"font-bold"}
            style={{
              color: "red",
              textAlign: "center",
              width: "fit-content",
              padding: "0px 10px",
            }}
          >
            {item.title}
          </p>
          <p style={{ color: "black" }}>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

function Message({ item }: { item: {
  description: string | ReactElement,
  type: string
} }) {
  const [render, setRender] = useState(false)
  useEffect(() => {
    const formatDescription = async () => {
      console.log("Starting text formatting");
      if (item.description) {
        try {
          let formattedText: string | ReactElement = '';
          if (typeof item.description === 'string')
            formattedText = <FormatText text={item.description} />;
          console.log("ofjeowjfioejwofje")
          item.description = formattedText; // Assuming the API returns the formatted text directly
          setRender(prev => !prev); // Update the state to indicate that the text formatting is done
        } catch (error) {
          console.error("Error formatting text:", error);
        }
      }
    };
  
    formatDescription();
  }, []);
  return (
    <>
      {item.type ? (
        item.type === "signin" ? (
          <SigninMessage item={item} />
        ) : item.type === "logout" ? (
          <LogoutMessage item={item} />
        ) : item.type === "rejoin" ? (
          <RejoinMessage item={item} />
        ) : item.type === "ad" ? (
          <AdMessage item={item} />
        ) : item.type === "hello" ? (
          <HelloMessage item={item} />
        ) : (item.type === "welcome" || item.type === "daily") ? (
          <WelcomaDailyMessage item={item} />
        ): (
          item.type === "signout" && <SignoutMessage item={item} />
        )
      ) : (
        <Default item={item} />
      )}
    </>
  );
}

export default Message;
