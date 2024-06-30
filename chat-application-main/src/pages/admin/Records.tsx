import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function Records() {
  return (
    <div className="flex flex-col gap-y-3 p-2">
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
                الدولة
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>elhaj</Td>
              <Td border={"1px solid gray"}>la chgar</Td>
              <Td border={"1px solid gray"}>192.168.1.1</Td>
              <Td border={"1px solid gray"}>
                المغرب
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Records;
