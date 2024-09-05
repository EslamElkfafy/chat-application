import { Textarea } from "@chakra-ui/react";
import { EMOJIS } from "../../lib/utils";
import { X } from "lucide-react";
import PlusButton from "../../components/_elements/PlusButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Control() {
  const uploudRef = useRef<HTMLInputElement>(null);
  const [render, setRender] = useState(false);
  const [emojis, setEmojis] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
         const response = await axios.get("emojis/get");
        setEmojis(Object.entries(response.data));
      } catch (error) {
        console.error(error);
      }
     
    })();
  }, [render])
  const handleUpload = async () => {
    if (!uploudRef.current?.files) return;
    const formData = new FormData();
    formData.append('file', uploudRef.current?.files[0]);
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        const data = await response.json()

        // Access the filename from the response
        await axios.post("emojis/add", {urlEmoji: data.path})
      } else {
        console.error('Failed to upload file');
        // Handle failure
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }
  const handleDelete = async(key: string) => {
    try {
      await axios.delete(`emojis/${key}`);
      setRender(prev => !prev)
    } catch (error) {
      console.error("Failed to delete the emoji:", error);
    }
  };
  return (
    <div className="flex flex-col gap-y-3 py-2 px-2">
      {/* <p className="p-1 text-white bg-blue-300 w-[150px] rounded-md px-2 cursor-pointer">
        إعدادت الموقع{" "}
      </p>
      <div className="flex flex-col">
        <label className="text-white px-2  bg-blue-700 p-1 rounded-md w-[150px]">
          عنوان الصفحة
        </label>
        <Textarea />
      </div>
      <div className="flex flex-col">
        <label className="text-white px-2  bg-blue-700 p-1 rounded-md w-[150px]">
          وصف الموقع
        </label>
        <Textarea />
      </div> */}
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center flex-col gap-y-1 ">
            <label className="flex items-center gap-x-2 w-full">
              <p className="text-white px-2   bg-blue-700 p-1 rounded-md w-fit">
                إيقونات{" "}
              </p>
              <PlusButton ref={uploudRef} onChange={handleUpload}/>
            </label>
            <div className="flex flex-wrap gap-2 items-center w-[400px]">
              {emojis.map(([abbreviation, urlEmoji]) => (
                <div className="flex items-center border p-1 rounded-md">
                  <img src={import.meta.env.VITE_API_BASE_URL + urlEmoji } alt="" className="h-5"/>
                  <X className="bg-red-600 p-1 rounded-md text-white cursor-pointer ml-2" onClick={() => handleDelete(abbreviation)}  />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex items-center flex-col gap-y-1 ">
            <label className="flex items-center gap-x-2 w-full">
              <p className="text-white px-2   bg-blue-700 p-1 rounded-md w-fit">
    {" "}هدية
              </p>
              <PlusButton />
            </label>
            <div className="flex flex-wrap gap-2 items-center w-[400px]">
              {EMOJIS.map((ele) => (
                <div className="flex items-center border p-1 rounded-md">
                  {ele}{" "}
                  <X className="bg-red-600 p-1 rounded-md text-white cursor-pointer" />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Control;
