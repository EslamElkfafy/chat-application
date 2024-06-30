import { Textarea } from "@chakra-ui/react";
import { EMOJIS } from "../../lib/utils";
import { X } from "lucide-react";
import PlusButton from "../../components/_elements/PlusButton";

function Control() {
  return (
    <div className="flex flex-col gap-y-3 py-2 px-2">
      <p className="p-1 text-white bg-blue-300 w-[150px] rounded-md px-2 cursor-pointer">
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
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center flex-col gap-y-1 ">
            <label className="flex items-center gap-x-2 w-full">
              <p className="text-white px-2   bg-blue-700 p-1 rounded-md w-fit">
                إيقونات{" "}
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
          </div>
          <div className="flex items-center flex-col gap-y-1 ">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Control;
