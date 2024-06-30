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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Plus, X, MessagesSquare } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useOptionContext } from "../../context/OptionContextProvider";
function CreateRoomModule() {
  const [ name, setName] = useState("");
  const [ description, setDescription ] = useState("")
  const [helloMessage, setHelloMessage] = useState("")
  const [password, setPaswword] = useState("")
  const [likes, setlikes] = useState(0)
  const [visitors, setVisitors] = useState(0)
  const [mics, setMics] = useState(0)
  const [voiceActive, setVoiceActive] = useState(true)
  const [withoutNotification, setWithoutNotification] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {option} = useOptionContext()
  const onCreateRoom = async () => {
    const room = {
      name,
      description,
      helloMessage,
      password,
      likes,
      visitors,
      mics,
      voiceActive,
      withoutNotification,
    }
    try
    {
      await axios.post("/rooms", room)
      toast.success("تم انشاء الغرفة بنجاح", option.toastOptions)
      onClose()
    } catch(e) {

      toast.error(<ul>
        {e.response.data.payload.map((error: string) => <li key={error}>{error}</li>)}
      </ul>, option.toastOptions)
    }
  }
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
          <div className="flex flex-col py-1 px-2 gap-y-1" dir="rtl">
            <Stack>

              <InputGroup size={"sm"}>
                <InputRightAddon >عنوان الغرفة</InputRightAddon>
                <Input
                  value={name}
                  onChange={(e) => {setName(e.target.value)}}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>الوصف</InputRightAddon>
                <Input
                  value={description}
                  onChange={(e) => {setDescription(e.target.value)}}
                  />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>رسالة الترحيب</InputRightAddon>
                <Input
                  value={helloMessage}
                  onChange={(e) => {setHelloMessage(e.target.value)}}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>كلمة المرور</InputRightAddon>
                <Input
                  value={password}
                  onChange={(e) => {setPaswword(e.target.value)}}
                  type={showPassword? "text" : "password"}
                />
                <InputLeftAddon>
                  <IconButton 
                    aria-label="Show Password"
                    size='sm'
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword? <ViewOffIcon /> : <ViewIcon/>} 
                  />
                </InputLeftAddon>
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>عدد اللايكات</InputRightAddon>
                <Input
                  dir="rtl"
                  type="number"
                  value={likes}
                  onChange={(e) => {setlikes(Number(e.target.value))}}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>عدد الزوار</InputRightAddon>
                <Input
                  type="number"
                  value={visitors}
                  onChange={(e) => {setVisitors(Number(e.target.value))}}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>عدد الصوتيات</InputRightAddon>
                <Input
                  type="number"
                  value={mics}
                  onChange={(e) => {setMics(Number(e.target.value))}}
                />
              </InputGroup>
            </Stack>
            <div className="flex mt-5 flex-col gap-y-2 ">
              <Checkbox
                isChecked={voiceActive}
                onChange={(e)=>{setVoiceActive(e.target.checked)}}
              > {"تفعيل الصوتية "}</Checkbox>
              <Checkbox
                isChecked={withoutNotification}
                onChange={(e)=>{setWithoutNotification(e.target.checked)}}
              >{"بدون إشعارات الدخول"}</Checkbox>
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
