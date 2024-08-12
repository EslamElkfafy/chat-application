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


function Status() {
  return (
    <div className="flex flex-col gap-y-3 p-2">
      <Input size={"sm"} placeholder="البحث..." />
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
            <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>send like</Td>
              <Td border={"1px solid gray"}>la chgar</Td>
              <Td border={"1px solid gray"}>
                elhaj
              </Td>
              <Td border={"1px solid gray"}>
                romm:Name
              </Td>
              <Td border={"1px solid gray"}>
                00:00:02:25
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Status;
