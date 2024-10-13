import { Input } from "@chakra-ui/react";
import { Send, PhoneCallIcon } from "lucide-react";
import ShareButton from "./_elements/ShareButtonOfBlogs";
import EmojiModule from "./EmojiModule";
import { useRef, useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import { useSocketContext } from "../context/SocketContextProvider";
import axios, { CancelTokenSource } from "axios";
import { toast } from "react-toastify";
import { useOptionContext } from "../context/OptionContextProvider";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import { getColor } from "../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";
import ShareButtonOfPrivate from "./_elements/ShareButtonOfPrivate";

function SendPrivateMessage({
  chatId,
  setListOfPrivateMessages,
  listOfPrivateMessages,
  toUserId
}: {
  chatId: any;
  setListOfPrivateMessages: any;
  listOfPrivateMessages: any;
  toUserId: any;
}) {
  const [message, setMessage] = useState("");
  const { user } = useUserContext();
  const inputRef: any = useRef(null);
  const { socket } = useSocketContext();
  const { option } = useOptionContext();
  // const [file, setFile] = useState<{
  //   type: string,
  //   url: string | ArrayBuffer | null | undefined,
  //   file: any
  // }>({
  //   type: "",
  //   url: "",
  //   file: null
  // })
  const [dataFile, setDataFile] = useState<{
    url: string;
    type: string;
  } | null>(null);
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);
  const [progress, setProgress] = useState<Number>(0);
  const [nameOfFileUploading, setNameOfFileUploading] = useState<String>("");
  const hiddenOfFileUploading = !progress ? "hidden" : "";
  const handleClick = async () => {
    const tempMessage: {
      description: string;
      userId: string;
      type: string;
      url: string | ArrayBuffer | null | undefined;
      arrivalTime: number;
      error: Error | null;
    } = {
      description: message,
      userId: user._id,
      arrivalTime: Date.now(),
      type: "",
      url: "",
      error: null,
    };
    if (dataFile) {
      tempMessage.type = dataFile.type;
      tempMessage.url = dataFile.url;
    }
    if (message || tempMessage.url) {
      let new_list = [...listOfPrivateMessages, tempMessage];
      socket.emit("send-private", tempMessage, chatId);
      try {
        if(chatId) await axios.put(`chats/messages/${chatId}`, { message: tempMessage });
        if(toUserId) await axios.put(`users/updateprivate/${toUserId}`, { userId: user._id});
        setMessage("");
        setProgress(0);
        setDataFile(null);
        inputRef.current.value = "";
        setListOfPrivateMessages(new_list);
      } catch (e) {
        toast.error({
          ...option.toastOptions,
          render: "لم يتم ارسال الرسالة",
          type: "error",
          isLoading: false,
        });
      }
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };
  const handleChange = async (event: any) => {
    const supportedFiles = [
      "video/mp4",
      "audio/mpeg",
      "image/webp",
      "image/jpeg",
      "image/gif",
      "image/png",
    ];
    const input = event.target;
    if (input.files?.[0]) {
      if (!supportedFiles.includes(input.files[0].type)) {
        toast.error("هذا الملف غير مدعوم", option.toastOptions);
        input.value = "";
      } else if (input.files[0].size > 10 * 1024 * 1024) {
        toast.error("هذا الملف كبير الحجم", option.toastOptions);
        input.value = "";
      } else {
        cancelTokenSource.current = axios.CancelToken.source();
        setNameOfFileUploading(input.files[0].name || "");
        const formData = new FormData();
        formData.append("file", input.files[0]);
        try {
          const res_url = import.meta.env.VITE_API_BASE_URL + "upload";
          const response = await axios.post(res_url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            cancelToken: cancelTokenSource.current.token, // Attach cancel token
            onUploadProgress: (progressEvent: any) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          });
          setProgress(100);
          if (response.status === 200) {
            console.log("File uploaded successfully");

            const data = response.data;
            console.log(data);
            setDataFile({
              url: data.path,
              type: data.type,
            });
          } else throw new Error("failed to upload the file");
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Upload canceled", error.message);
          } else {
            console.error("Upload failed:", error);
          }
        }
      }
    }
  };
  const handleCloseUploading = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Upload canceled by user.");
      inputRef.current.value = "";
      setDataFile(null);
      setProgress(0);
    }
  };
  return (
    <>
      <div className="flex items-center gap-x-1 p-2 relative" style={{backgroundColor: getColor("backgroundItems")}}>
        <div
          className={`absolute left-0 right-0 bottom-full flex flex-col ${hiddenOfFileUploading}`}
        >
          <progress
            className="w-full"
            value={progress.toString()}
            max="100"
          ></progress>
          <div className="flex border border-black">
            <button
              className="p-2"
              style={{
                backgroundColor: getColor("closeButton"),
                color: getColor("textOfCloseButton"),
              }}
              onClick={handleCloseUploading}
            >
              <CloseIcon sx={{ fontSize: 20, fontWeight: "bold" }} /> الغاء
            </button>
            <div
              className="flex-1 overflow-auto p-1"
              style={{
                backgroundColor: getColor("mainButton"),
                color: getColor("textOfMainButton"),
              }}
            >
              %{progress.toString()} | {nameOfFileUploading}
            </div>
          </div>
        </div>
        <ShareButtonOfPrivate
          handleChange={handleChange}
          reference={inputRef}
        />
        <EmojiModule text={message} setText={setMessage} />
        <Input
          height={"28px"}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك..."
          bg={"white"}
        />
        <div
          className="cursor-pointer p-1 flex text-xs items-center"
          style={{backgroundColor: getColor("mainButton"), color: getColor("textOfMainButton")}}
          onClick={handleClick}
        >
          <Send size={"18px"} />
          إرسال
        </div>
      </div>
      {/* <div className="ms-auto me-auto p-5 ">
        {
          file.type &&
          file.type === "image"? <img src={file.url}/>:
          file.type === "video"? <VideoPlayer src={file.url} type={file.file.type}/>:
          file.type === "audio"? <AudioPlayer src={file.url}/>:
          <p> لا توجد معاينه </p>
        }
      </div> */}
    </>
  );
}

export default SendPrivateMessage;
