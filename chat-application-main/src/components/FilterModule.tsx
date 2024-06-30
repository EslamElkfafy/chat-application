import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus, Save } from "lucide-react";

function FilterModule() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Plus className="p-1 text-white bg-blue-700 cursor-pointer rounded" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form className="flex flex-col gap-y-3 px-3 py-4">
            <div className="flex flex-col">
              <label>الكلمة</label>
              <Input size={"sm"} />
            </div>
            <div className="flex flex-col">
              <label> التعويض</label>
              <Input size={"sm"} />
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FilterModule;
