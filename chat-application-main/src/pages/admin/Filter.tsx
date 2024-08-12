import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
} from "@chakra-ui/react";
import FilterModule from "../../components/FilterModule";
import { X } from "lucide-react";

function Filter() {
  return (
    <div className="flex flex-col gap-y-4 py-4 px-2">
      <Input size={"sm"} placeholder="اضافه كلمه" />
      <Button
              bg={"#46994b"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه الي الكلمات المسموحه
              </div>
            </Button>
            <Button
              bg={"#dc5038"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه الي الكلمات الممنوعه
              </div>
            </Button>
            <Button
              bg={"#2eadd7"}
              color={"white"}
              _hover={{}}
              size={"sm"}
              
            >
              <div className="flex items-center ">
                اضافه الي الكلمات المراقبه
              </div>
            </Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="bg-blue-500 ">
            <Th color={"white"} border={"1px solid gray"}>
                التصنيف
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                الكلمة
              </Th>
              <Th color={"white"} border={"1px solid gray"}>
                حذف
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="bg-green-50">
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
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {/* <FilterModule/> */}
    </div>
  );
}

export default Filter;
