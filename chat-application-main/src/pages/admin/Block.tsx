import { Button, Checkbox, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Browzer, System } from "../../lib/utils";
import { Save } from "lucide-react";
import { X } from "lucide-react";

function Block() {
  
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <div className="flex">
      <Input size={"sm"} placeholder="اسم جهاز\\دوله\\اي بي" />
      <Button
              bg={"#46994b"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه
              </div>
            </Button>
      </div>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
            <Th color={"white"} border={"1px solid gray"}>
                العضو
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الحظر
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                ينتهي في
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* <Tr className="bg-green-50">
              <Td border={"1px solid gray"}>مراقبه</Td>
              <Td border={"1px solid gray"}>شان</Td>
              <Td border={"1px solid gray"}><Button
              bg={"rgb(239 68 68)"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <X />
            </Button></Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <FilterModule/> */}
    </div>
  );
}

export default Block;
