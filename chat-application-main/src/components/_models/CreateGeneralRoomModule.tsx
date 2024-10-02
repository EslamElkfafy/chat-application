import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Input,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  Stack,
  IconButton,
  InputRightAddon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Plus, X, MessagesSquare } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useOptionContext } from "../../context/OptionContextProvider";
import { useSocketContext } from "../../context/SocketContextProvider";
function CreateRoomModule() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [helloMessage, setHelloMessage] = useState("");
  const [visitors, setVisitors] = useState(0);
  const [voiceActive, setVoiceActive] = useState(true);
  const [withoutNotification, setWithoutNotification] = useState(false);
  const { option } = useOptionContext();
  const { socket } = useSocketContext();

  const onCreateRoom = async () => {
    const room = {
      name,
      description,
      helloMessage,
      visitors,
      voiceActive,
      withoutNotification,
    };
    try {
      await axios.post("/general/addManual", room);
      toast.success("تم انشاء الغرفة العامة بنجاح", option.toastOptions);
      socket.emit("roomsDeleteChecker");
      onClose();
    } catch (e: any) {
      toast.error(
        <ul>
          {e.response.data.payload.map((error: string) => (
            <li key={error}>{error}</li>
          ))}
        </ul>,
        option.toastOptions
      );
    }
  };
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
              إنشاء الغرفة العامة
            </div>
            <div
              className="text-white bg-red-500 p-1 rounded-sm cursor-pointer"
              onClick={onClose}
            >
              <X />
            </div>
          </div>
          <div className="flex flex-col py-1 px-2 gap-y-1" dir="rtl">
            <Stack>
              <InputGroup size={"sm"}>
                <InputRightAddon>عنوان الغرفة</InputRightAddon>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>الوصف</InputRightAddon>
                <Input
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>رسالة الترحيب</InputRightAddon>
                <Input
                  value={helloMessage}
                  onChange={(e) => {
                    setHelloMessage(e.target.value);
                  }}
                />
              </InputGroup>

              <InputGroup size={"sm"}>
                <InputRightAddon>عدد الزوار</InputRightAddon>
                <Input
                  type="number"
                  value={visitors}
                  onChange={(e) => {
                    setVisitors(Number(e.target.value));
                  }}
                />
              </InputGroup>
            </Stack>
            <div className="flex mt-5 flex-col gap-y-2 ">
              <Checkbox
                isChecked={voiceActive}
                onChange={(e) => {
                  setVoiceActive(e.target.checked);
                }}
              >
                {" "}
                {"تفعيل الصوتية "}
              </Checkbox>
              <Checkbox
                isChecked={withoutNotification}
                onChange={(e) => {
                  setWithoutNotification(e.target.checked);
                }}
              >
                {"بدون إشعارات الدخول"}
              </Checkbox>
            </div>
            <Button
              mt={"10px"}
              leftIcon={<Plus className="text-blue-700" />}
              _hover={{}}
              color={"rgb(29 78 216)"}
              onClick={onCreateRoom}
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
