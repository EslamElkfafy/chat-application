import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import FilterModule from "../../components/FilterModule";

function Filter() {
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <label className="text-white px-2 text-center  bg-blue-500 p-1 rounded-md w-[150px]">
        فلتر
      </label>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
              <Th color={"white"} border={"1px solid gray"}>
                الكلمة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                التعويض{" "}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>example</Td>
              <Td border={"1px solid gray"}>******</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <FilterModule/>
    </div>
  );
}

export default Filter;
