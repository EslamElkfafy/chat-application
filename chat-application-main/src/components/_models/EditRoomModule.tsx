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
import RoomRepository from "../../repositories/roomRepository";
import Room from "../../lib/Room";
import { Edit } from "lucide-react";
import { useSocketContext } from "../../context/SocketContextProvider";

function EditRoomModule({id}: {id: string}) {
  const [room, setRoom] = useState<Room | null>(null)
  const {option} = useOptionContext()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {isOpen, onOpen, onClose } = useDisclosure();
  const {socket} = useSocketContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRoom(await RoomRepository.getById(id))
      } catch(e) {
        console.error(e)
      }
    }
    fetchData()
  },[isOpen])
  const onEditRoom = async () => {
    const toastId = toast.loading("بتم تعديل الغرفة", option.toastOptions)
    try
    {
      if (room)
        await RoomRepository.updateById(room)
        toast.update(toastId, {...option.toastOptions, render: "تم تعديل الغرفة", type: "success", isLoading: false})
        socket.emit("roomsDeleteChecker")
        onClose()
    } catch(e: any) {
      toast.update(toastId, {...option.toastOptions, render: "حدث خطأ في السيرفر", type: "error", isLoading: false})
      console.log(e)
    }
  }
  return (
    <>
      <Edit 
        onClick={onOpen}
        className="bg-green-600 p-1 size-8 rounded-sm text-white cursor-pointer" />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent width={"350px"}>
          <div className="flex py-1 px-2 items-center justify-between bg-blue-950 text-white ">
            <div className="flex   cursor-pointer  text-sm items-center justify-center">
              <MessagesSquare />
              تعديل {room?.name}  
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
                  value={room?.name}
                  onChange={(e) => setRoom((prev: Room | null) => {
                    if (prev)
                    {
                      return {...prev, name: e.target.value}
                    }
                    return prev
                  })}
                />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>الوصف</InputRightAddon>
                <Input
                  value={room?.description}
                  onChange={(e) => setRoom((prev: Room | null) => {
                    if (prev)
                    {
                      return {...prev, description : e.target.value}
                    }
                    return prev
                  })}
                  />
              </InputGroup>
              <InputGroup size={"sm"}>
                <InputRightAddon>رسالة الترحيب</InputRightAddon>
                <Input
                  value={room?.helloMessage}
                  onChange={(e) => setRoom((prev: Room | null) => {
                    if (prev)
                    {
                      return {...prev, helloMessage: e.target.value}
                    }
                    return prev
                  })}
                />
              </InputGroup>
              {room?.type != "general" && 
              <> 
                <InputGroup size={"sm"}>
                  <InputRightAddon>كلمة المرور</InputRightAddon>
                  <Input
                    value={room?.password}
                    onChange={(e) => setRoom((prev: Room | null) => {
                      if (prev)
                        {
                          return {...prev, password: e.target.value}
                        }
                        return prev
                      })}
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
                    value={room?.enterLikes}
                    onChange={(e) => setRoom((prev: Room | null) => {
                      if (prev)
                        {
                          return {...prev, enterLikes: +e.target.value}
                        }
                        return prev
                      })}
                      />
                </InputGroup>
              </>
              }
              <InputGroup size={"sm"}>
                <InputRightAddon>عدد الزوار</InputRightAddon>
                <Input
                  type="number"
                  value={room?.visitors}
                  onChange={(e) => setRoom((prev: Room | null) => {
                    if (prev)
                    {
                      return {...prev, visitors: +e.target.value}
                    }
                    return prev
                  })}
                />
              </InputGroup>
              {/* {room?.type != "general" && 
                <InputGroup size={"sm"}>
                  <InputRightAddon>عدد الصوتيات</InputRightAddon>
                  <Input
                    type="number"
                    value={room?.mics}
                    onChange={(e) => setRoom((prev: Room | null) => {
                      if (prev)
                      {
                        return {...prev, mics: +e.target.value}
                      }
                      return prev
                    })}
                  />
                </InputGroup>
              } */}
            </Stack>
            <div className="flex mt-5 flex-col gap-y-2 ">
              <Checkbox
                isChecked={room?.voiceActive}
                onChange={(e) => setRoom((prev: Room | null) => {
                  if (prev)
                  {
                    return {...prev, voiceActive: e.target.checked}
                  }
                  return prev
                })}
              > {"تفعيل الصوتية "}</Checkbox>
              <Checkbox
                isChecked={room?.withoutNotification}
                onChange={(e) => setRoom((prev: Room | null) => {
                  if (prev)
                  {
                    return {...prev, withoutNotification: e.target.checked}
                  }
                  return prev
                })}
              >{"بدون إشعارات الدخول"}</Checkbox>
            </div>
            <Button
                mt={"10px"}
              _hover={{}}
              color={"rgb(29 78 216)"}
              onClick={onEditRoom}
            >
              تعديل الغرفة
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditRoomModule;
