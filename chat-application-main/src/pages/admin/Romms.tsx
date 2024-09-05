import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Room from "../../lib/Room";
import RoomRepository from "../../repositories/roomRepository";
import { useOptionContext } from "../../context/OptionContextProvider";
import { toast } from "react-toastify";
import EditRoomModule from "../../components/_models/EditRoomModule";
import { useSocketContext } from "../../context/SocketContextProvider";
import CreateRoomModule from "../../components/_models/CreateGeneralRoomModule";


function Romms() {
  const [searchText, setSearchText] = useState<string>("")
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const {option} = useOptionContext()
  const [deleteChecker, setDeleteChecker] = useState<boolean>(false)
  const {socket} = useSocketContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRooms(await RoomRepository.getAllRooms())
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [deleteChecker])
  useEffect(() => {
    const handleSocket = () => {
      setDeleteChecker((prev) => !prev)
    }
    socket.on("roomsDeleteChecker", handleSocket)
    return () => socket.off("roomsDeleteChecker", handleSocket)
  },[])
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("يتم حذف الغرفة", option.toastOptions)
    try {
      await RoomRepository.deleteById(id)
      toast.update(toastId, {...option.toastOptions, type:"success", render: "تم حذف الغرفة", isLoading: false})
      socket.emit("roomsDeleteChecker")
      } catch(e) {
      toast.update(toastId, {...option.toastOptions, type:"error", render: "حدث خطأ في السيرفر", isLoading: false})
      console.error(e)
    }
  }
  return (
    <div className="flex flex-col gap-y-3 p-2">
      <Input size={"sm"} placeholder="البحث..." onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
        <CreateRoomModule key={2}/>
        <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                الغرفة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                صاحب الغرفة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                إعدادات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              rooms?.filter((room: Room) => room.name.includes(searchText)).map((room: Room) => {
                return (
                  <Tr className="bg-green-50" key={room._id}>
                    <Td border={"1px solid gray"}>{room.name}</Td>
                    <Td border={"1px solid gray"}>{room.userName}</Td>
                    <Td border={"1px solid gray"}>
                      <div className="flex items-center gap-x-1 w-full">
                        <EditRoomModule id={room._id}/>
                        <X className="bg-red-600 text-white p-1 size-8 rounded-sm cursor-pointer" onClick={() => handleDelete(room._id)}/>
                      </div>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Romms;
