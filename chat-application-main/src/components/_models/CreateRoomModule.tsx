import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { Plus, X, MessagesSquare } from "lucide-react";

function CreateRoomModule() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size={"sm"}
        leftIcon={<Plus />}
        bg={"rgb(34 197 94)"}
        color={"white"}
        onClick={onOpen}
      >
        غرفه جديدة
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"350px"}>
          <div className="flex py-1 px-2 items-center justify-between bg-blue-950 text-white ">
            <div className="flex   cursor-pointer  text-sm items-center justify-center">
              <MessagesSquare />
              إنشاء الغرفة
            </div>
            <div
              className="text-white bg-red-500 p-1 rounded-sm cursor-pointer"
              onClick={onClose}
            >
              <X />
            </div>
          </div>
          <div className="flex flex-col py-1 w-[200px] px-2 gap-y-1">
            <Input size={"sm"} placeholder="عنوان الغرفة" />
            <Input size={"sm"} placeholder="الوصف" />
            <Input size={"sm"} placeholder="رسالة الترحيب" />
            <Input size={"sm"} placeholder="كلمة المرور"  type="password" />
            <Input size={"sm"} placeholder="عدد اللايكات"  type="number"/>
            <Input size={"sm"} placeholder="عدد الزوار"  type="number" />
            <Input size={"sm"} placeholder="عدد الصوتيات"   type="number" />

            <div className="flex mt-5 flex-col gap-y-2 ">
              <Checkbox> {"تفعيل الصوتية "}</Checkbox>
              <Checkbox>{"بدون إشعارات الدخول"}</Checkbox>
            </div>
            <Button
                mt={"10px"}
              leftIcon={<Plus className="text-blue-700" />}
              _hover={{}}
              color={"rgb(29 78 216)"}
            >
              إنشاء الغرفة
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateRoomModule;
