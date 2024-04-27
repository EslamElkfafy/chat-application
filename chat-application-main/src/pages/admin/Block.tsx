import { Button, Checkbox } from "@chakra-ui/react";
import { Browzer, System } from "../../lib/utils";
import { Save } from "lucide-react";

function Block() {
  
  return (
    <div className="flex flex-col py-4 px-3 gap-y-7">
      <label className="text-white px-2  bg-blue-700 p-1 rounded-md w-[150px]">
        السماح للمتصفح
      </label>
      <div className="border flex flex-col gap-y-3 p-4 rounded-md">
        <Checkbox color={"gray"}>السماح بدخول جميع المتصفحات</Checkbox>
        <div className="flex flex-wrap gap-x-4">
          {Browzer.map((item) => (
            <Checkbox color={"gray"}>{item}</Checkbox>
          ))}
        </div>
        <Button
          color={"white"}
          bg={"rgb(37 99 235)"}
          leftIcon={<Save />}
          w={"fit-content"}
          _hover={{}}
          size={"sm"}
        >
          حفظ
        </Button>
      </div>
      <label className="text-white px-2  bg-blue-700 p-1 rounded-md w-fit">
         بتشغيل النظام
      </label>
      <div className="border flex flex-col gap-y-3 p-4 rounded-md">
      <Checkbox color={"gray"}>تشغيل النظام يسمح للجميع</Checkbox>
      <div className="flex flex-wrap gap-x-4">
      {System.map((item) => (
          <Checkbox color={"gray"}>{item}</Checkbox>
        ))}
      </div>
        <Button
          color={"white"}
          bg={"rgb(37 99 235)"}
          leftIcon={<Save />}
          w={"fit-content"}
          _hover={{}}
          size={"sm"}
        >
          حفظ
        </Button>
      </div>
    </div>
  );
}

export default Block;
