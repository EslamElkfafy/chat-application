import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import StatusType from "../../lib/Status";
import { useEffect, useState } from "react";
import StatusRepository from "../../repositories/statusRepository";
import { timeFormmater } from "../../lib/formatTime";


function Status() {
  const [statusRecords, setStatusRecords] = useState<StatusType[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatusRecords(await StatusRepository.getAll())
      } catch(e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex flex-col gap-y-3 p-2">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                الحالة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                العضو
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                العضو الثاني
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الغرفة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الوقت
              </Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              statusRecords && statusRecords.map((status: StatusType) => {
                return (
                  <Tr className="bg-green-50" key={status._id}>
                    <Td border={"1px solid gray"}>{status.name}</Td>
                    <Td border={"1px solid gray"}>{status.user1Name}</Td>
                    <Td border={"1px solid gray"}>
                      {status.user2Name}
                    </Td>
                    <Td border={"1px solid gray"}>
                      {status.roomName}
                    </Td>
                    <Td border={"1px solid gray"}>
                    {timeFormmater(new Date(Date.now()), new Date(status.createdAt!))}
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

export default Status;
