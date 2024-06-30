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
import RoomImage from "../../components/_elements/RoomImage";
import { X } from "lucide-react";

function Romms() {
  return (
    <div className="flex flex-col gap-y-3 p-2">
      <Input size={"sm"} placeholder="البحث..." />
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
            <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>room-name</Td>
              <Td border={"1px solid gray"}>la chgar</Td>
              <Td border={"1px solid gray"}>
                <div className="flex items-center gap-x-1 w-full">
                  <img src="/1600w-qJptouniZ0A.webp" className="w-11 h-11" />
                  <RoomImage />
                  <X className="bg-red-600 text-white p-1 size-8 rounded-sm" />
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Romms;
