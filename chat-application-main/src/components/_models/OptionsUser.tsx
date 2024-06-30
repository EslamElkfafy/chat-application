import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { Settings, X } from "lucide-react";

function OptionsUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Settings onClick={onOpen} className="cursor-pointer text-blue-600" />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex bg-blue-950 items-center justify-between p-1">
            <div className=""></div>
            <div
              className="text-white bg-red-500 p-1 rounded-sm cursor-pointer"
              onClick={onClose}
            >
              <X />
            </div>
          </div>
          <form className="flex gap-x-1  flex-col gap-y-4 py-4 px-5">
            <div className="flex items-center gap-x-2">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                الصلاحيات
              </label>

              <Select size={"sm"} width={"200px"}>
                {[...Array(5)].map((_, i) => (
                  <option>صلاحيات {i + 1}</option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-x-2">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                المدة
              </label>

              <Input size={"sm"} width={"150px"} />
              <Button
                bg={"rgb(34 197 94)"}
                color={"white"}
                _hover={{}}
                size={"sm"}
              >
                حفظ
              </Button>
            </div>
            <div className="flex items-center gap-x-2">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                لايكات
              </label>

              <Input size={"sm"} width={"150px"} type="number" />
              <Button
                bg={"rgb(34 197 94)"}
                color={"white"}
                _hover={{}}
                size={"sm"}
              >
                حفظ
              </Button>
            </div>
            <div className="flex items-center gap-x-2 ">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                تغير كلمة السر
              </label>

              <Input size={"sm"} width={"150px"} type="password" />
              <Button
                bg={"rgb(34 197 94)"}
                color={"white"}
                _hover={{}}
                size={"sm"}
              >
                حفظ
              </Button>
            </div>
            <Button
              bg={"rgb(239 68 68)"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                <X />
                حذف
              </div>
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OptionsUser;
