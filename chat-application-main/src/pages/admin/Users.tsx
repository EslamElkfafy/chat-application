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


import OptionsUser from "../../components/_models/OptionsUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import User from "../../lib/User"
import { useSocketContext } from "../../context/SocketContextProvider";

function Users() {
  const [users, setUsers] : [User[], Dispatch<SetStateAction<User[]>>]= useState<User[]>([])
  const [searchString, setSearchString] : [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  const [usersDeleteChecker, setUserDeleteChecker] = useState<boolean>(false)
  const {socket} = useSocketContext()

  const timeFormmater : (firstDate: Date, secondDate: Date) => string = (firstDate, secondDate) => {
    let diff = firstDate.getTime() - secondDate.getTime()
    let days = 0, hours = 0, minutes = 0, seconds = 0
    if (diff > (1000 * 60 * 60 * 24))
    {
      days = Math.floor(diff / (1000 * 60 * 60 * 24))
      diff = diff - days * (1000 * 60 * 60 * 24)
    }
    if (diff > (1000 * 60 * 60))
    {
      hours = Math.floor(diff / (1000 * 60 * 60))
      diff = diff - hours * (1000 * 60 * 60)
    }
    if (diff > (1000 * 60))
    {
      minutes = Math.floor(diff / (1000 * 60))
      diff = diff - minutes * (1000 * 60)
    }
    if (diff > (1000))
    {
      seconds = Math.floor(diff / 1000)
      diff = diff - seconds * (1000)
    }
    return `${days}D ${hours}H ${minutes}M ${seconds}S`
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("users/findall")
      setUsers(response.data)
    }
    fetchData()
  }, [usersDeleteChecker])

  useEffect(() => {
    const handleSocket = () => {
      setUserDeleteChecker((prev) => !prev)
    }
    socket.on("usersDeleteChecker", handleSocket)
    return () => socket.off("usersDeleteChecker", handleSocket)
  },[])
  return (
    <div className="flex flex-col gap-y-3 p-2">
      <Input size={"sm"} placeholder="البحث..." value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                العضو
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الزخروفه
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                أي بي
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الجهاز
              </Th>
              {/* <Th color={"white"} border={"1px solid gray"}>
                صلاحيات
              </Th> */}
              <Th color={"white"} border={"1px solid gray"}>
                اخر تواجد
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                ضبط
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              users.filter((user: User) => user.userName.includes(searchString)).map((user) => {
                return <Tr className="bg-green-50" key={user._id}>
                  <Td border={"1px solid gray"}>{user.userName}</Td>
                  <Td border={"1px solid gray"}>{user.name}</Td>
                  <Td border={"1px solid gray"}>{user.ip}</Td>
                  <Td border={"1px solid gray"}>{user.device}</Td>
                  <Td border={"1px solid gray"}>{timeFormmater(new Date(Date.now()), new Date(user.updatedAt))}</Td>
                  <Td border={"1px solid gray"}><OptionsUser userId={user._id} key={user._id}/></Td>
                </Tr>
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
