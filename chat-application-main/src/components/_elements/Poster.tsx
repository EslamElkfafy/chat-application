import { Input, Textarea } from "@chakra-ui/react";
import { Send } from "lucide-react";
import ShareButton from "./ShareButtonOfBlogs";
import EmojiModule from "../EmojiModule";
import { useRef, useState } from "react";
import { useOptionContext } from "../../context/OptionContextProvider";
import { useUserContext } from "../../context/UserContextProvider";
import axios, { CancelTokenSource } from "axios";
import { toast } from "react-toastify";
import AudioPlayer from "../AudioPlayer";
import VideoPlayer from "../VideoPlayer";
import { getColor } from "../../lib/getColor";
import CloseIcon from "@mui/icons-material/Close";
import ShareButtonOfBlogs from "./ShareButtonOfBlogs";

function Poster() {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const inputRef: any = useRef(null);
  // const [file, setFile]: any = useState({
  //   type: "",
  //   url: "",
  //   file: null,
  // });
  const [dataFile, setDataFile] = useState<{url: string, type: string} | null>(null);
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);
  const [progress, setProgress] = useState<Number>(0);
  const [nameOfFileUploading, setNameOfFileUploading] = useState<String>("");
  const { option } = useOptionContext();
  const hiddenOfFileUploading = !progress ? "hidden" : "";
  const handleSend = async () => {
    if (dataFile) {
      // const toastId = toast.loading("يتم رفع الملف...", option.toastOptions);
      const newPost = {
        userId: user._id,
        url: dataFile.url,
        type: dataFile.type,
        arrivalTime: Date.now(),
        text: title,
      };
      try {
        axios.post("posts/addpost", newPost);
      } catch (error) {
        console.error(error);
      }
      
    } else if (title) {
      try {
        axios.post("posts/addpost", {
          userId: user._id,
          type: "text only",
          arrivalTime: Date.now(),
          text: title,
        });
      } catch (e) {
        console.error(e);
      }
    }
    setTitle("");
    setProgress(0);
    setDataFile(null);
    inputRef.current.value = '';
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleSend();
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
        // setFile({
        //   type: "",
        //   url: "",
        //   file: null,
        // });
      } else if (input.files[0].size > 10 * 1024 * 1024) {
        toast.error("هذا الملف كبير الحجم", option.toastOptions);
        input.value = "";
      } else {
        // let reader = new FileReader();
        // reader.onload = function (e) {
        //   setFile({
        //     type: input.files[0].type.split("/")[0],
        //     url: e.target?.result,
        //     file: input.files[0],
        //   });
        // };
        // setFile({
        //   type: "",
        //   url: "",
        //   file: null,
        // });
        // reader.readAsDataURL(input.files[0]);
        cancelTokenSource.current = axios.CancelToken.source();
        setNameOfFileUploading(input.files[0].name || "");
        const formData = new FormData();
        formData.append("file", input.files[0]);
        try {
          const res_url = import.meta.env.VITE_API_BASE_URL + "upload";
          // const response = await fetch(res_url, {
          //   method: "POST",
          //   body: formData,
          // });
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
            })
            // const newPost = {
            //   userId: user._id,
            //   url: `${data.path}`,
            //   type: data.type,
            //   arrivalTime: Date.now(),
            //   text: title,
            // };
            // await axios.post("posts/addpost", newPost);
            // toast.update(toastId, {
            //   ...option.toastOptions,
            //   render: "تم رفع الملف بنجاح",
            //   type: "success",
            //   isLoading: false,
            // });
            // inputRef.value = "";
            // setFile({
            //   type: "",
            //   url: "",
            //   file: null,
            // });
            // setTitle("");
          } else throw new Error("failed to upload the file");
        } catch (error) {
          // toast.update(toastId, {
          //   ...option.toastOptions,
          //   render: "لم يتم رفع الملف",
          //   type: "error",
          //   isLoading: false,
          // });
          if (axios.isCancel(error)) {
            console.log("Upload canceled", error.message);
          } else {
            console.error("Upload failed:", error);
          }
          // Handle error
        }
      }
    }
  };
  const handleCloseUploading = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Upload canceled by user.");
      inputRef.current.value = '';
      setDataFile(null);
      setProgress(0);
    }
  };
  return (
    <>
      <div
        className="flex items-center gap-x-1 p-1 h-[2.625rem] relative"
        style={{ backgroundColor: getColor("backgroundItems") }}
      >
        <div className={`absolute left-0 right-0 bottom-full flex flex-col ${hiddenOfFileUploading}`}>
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

        <ShareButtonOfBlogs handleChange={handleChange} reference={inputRef} />
        <EmojiModule text={title} setText={setTitle} />
        <textarea
          value={title}
          className="flex-auto h-[2rem] p-[0.375rem] overflow-hidden"
          placeholder="اكتب رسالتك هنا..."
          onChange={(e) => setTitle(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="cursor-pointer p-1 flex text-xs items-center "
          style={{
            backgroundColor: getColor("mainButton"),
            color: getColor("textOfMainButton"),
          }}
          onClick={handleSend}
          disabled={progress !== 0 || progress !== 100}
        >
          <Send size={"18px"} />
          إرسال
        </button>
      </div>
      {/* <div className="ms-auto me-auto p-5">
        {file.type && file.type === "image" ? (
          <img src={file.url} />
        ) : file.type === "video" ? (
          <VideoPlayer src={file.url} type={file.file.type} />
        ) : file.type === "audio" ? (
          <AudioPlayer src={file.url} />
        ) : (
          <p> لا توجد معاينه </p>
        )}
      </div> */}
    </>
  );
}

export default Poster;
