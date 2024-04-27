import { Select, Button, Input, Checkbox } from "@chakra-ui/react";
import { X } from "lucide-react";
import { EMOJIS } from "../../lib/utils";
import { Save } from "lucide-react";

function Permission() {
  return (
    <div className="flex flex-col gap-y-9 p-2 ">
      <div className="flex items-center gap-x-2  ">
        <Select size={"sm"}>
          {[...Array(5)].map((_, i) => (
            <option>صلاحيات {i + 1}</option>
          ))}
        </Select>
        <Button bg={"rgb(220 38 38)"} color={"white"} _hover={{}} size={"sm"}>
          <div className="flex items-center">
            <X /> حذف
          </div>
        </Button>
      </div>
      <div className="flex-col flex gap-y-1">
        <div className="flex items-center gap-x-1">
          <label className="bg-blue-600 p-1 text-white rounded-sm">ترتيب</label>
          <Input size={"sm"} type="number" />
        </div>
        <div className="flex flex-col">
          <label className="bg-blue-600 p-1 text-white rounded-sm w-fit px-1">
            إيقون
          </label>
          <Select size={"sm"}>
            {EMOJIS.map((em) => (
              <option>{em}</option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-x-1">
          <label className="bg-blue-600 p-1 text-white rounded-sm">طرد</label>
          <Input type="number" size={"sm"} />
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">حذف الحائط</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">التنبهات</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">تغير الناك</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">تغير الناكت</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">الباند</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">فتح الخاص</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">إدارة الغرفة</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">إنشاء الغرفة</p>
          </Checkbox>
        </div>
        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">تعديل الصلاحيات</p>
          </Checkbox>
        </div>

        <div className="flex items-center mt-2 ">
          <Checkbox>
            <p className="font-semibold">لوحة التحكم</p>
          </Checkbox>
        </div>
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
  );
}

export default Permission;
