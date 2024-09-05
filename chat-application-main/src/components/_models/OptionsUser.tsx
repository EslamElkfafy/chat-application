import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
  Button,
} from "@chakra-ui/react";
import { Settings, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import User from "../../lib/User";
import UserRepository from "../../repositories/userRepository";
import { useOptionContext } from "../../context/OptionContextProvider";
import { useSocketContext } from "../../context/SocketContextProvider";

function OptionsUser({userId}: {userId: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | null>(null)
  const [password, setPassword] = useState<string>("")
  const {option} = useOptionContext()
  const {socket} = useSocketContext()

  const handleSaving = async () => {
    if (password && user)
      user.password = password
    const toastId = toast.loading("يتم تعديل معلومات المستخدم", option.toastOptions)
    try {
      if (user) 
      {
        await UserRepository.update(user)
        toast.update(toastId, { ...option.toastOptions, render: "تم التعديل بنجاح", type: "success", isLoading: false })
      }

    } catch(e) {
      toast.update(toastId, { ...option.toastOptions, render: "فشل التعديل لخطأ بالسيرفر", type: "error", isLoading: false })
      console.error(e)
    }
  }
  const handleDelete = async () => {
    const toastId = toast.loading("يتم حذف المستخدم", option.toastOptions)
    try {
      await UserRepository.deleteById(userId)
      toast.update(toastId, {...option.toastOptions, render: "تم حذف المستخدم", type: "success", isLoading: false})
      socket.emit("usersDeleteChecker")
      onClose()
    } catch(e) {
      console.error(e)
      toast.update(toastId, {...option.toastOptions, render: "خطأ في السيرفر", type: "error", isLoading: false})
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData : User = await UserRepository.getById(userId)
        setUser(userData)
      } catch(e) {
        console.error(e)
      }
    }
    fetchData()
  }, [isOpen])
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
          <div className="flex flex-col gap-y-2 m-2">

            {/* <div className="flex items-center gap-x-2">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                الصلاحيات
              </label>

              <Select size={"sm"} width={"200px"}>
                {[...Array(5)].map((_, i) => (
                  <option key={i}>صلاحيات {i + 1}</option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-x-2">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                المدة
              </label>

              <Input size={"sm"} width={"150px"} />
              
            </div> */}
            <div className="flex items-center gap-x-2">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                لايكات
              </label>

              <Input size={"sm"} width={"150px"} type="number" value={user?.like} onChange={(e) => setUser((prev: User | null) : User | null=> {
                if (prev) {
                  return {...prev, like: +e.target.value}
                }
                return null
              })}/>
              
            </div>
            <div className="flex items-center gap-x-2 ">
              <label className="bg-blue-600 p-1 text-white rounded-sm">
                تغيير كلمة السر
              </label>

              <Input size={"sm"} width={"150px"} type="password" onChange={(e) => setPassword(e.target.value)} />
              
            </div>
            <div className="flex justify-between items-center">
            <Button
                bg={"rgb(34 197 94)"}
                color={"white"}
                _hover={{}}
                size={"lg"}
                onClick={handleSaving}
              >
                حفظ
              </Button>
              {/* <div>
                <div className="flex items-center gap-1 justify-end"><p>توثيق عضويه</p> <input type="checkbox" /></div>
                <div className="flex items-center gap-1 justify-end"><p>دخول مميز</p><input type="checkbox" /></div>

              </div> */}
            </div>
            <Button
              bg={"rgb(239 68 68)"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              onClick={handleDelete}
            >
              <div className="flex items-center" >
                <X />
                حذف
              </div>
            </Button>
          </div>
          </ModalContent>
      </Modal>
    </>
  );
}

export default OptionsUser;
